---
title: "Object Registration in OpenFOAM"
description: "How to get a (const) reference for an OpenFOAM variable from 'everywhere'"
meta_title: ""
date: 2018-09-12T08:00:00Z
image: "/images/objectregistry-openfoam.png"
categories:
  - programming
author: "Mohammed Elwardi Fadeli"
tags:
  - OpenFOAM
  - Vim
draft: false
---

Being aware of all the important variables during the simulation is a nice feature to have in any CFD software. I've even seen some software developers "brag" about how many "variables" their simulators efficiently manage at run time. Today, we'll discover how OpenFOAM solvers **keep track** of model data used across libraries.

## Know the difference between Object Registration and Run-Time Selection Table

{{< notice "note" >}}
When I mention 'Object registration,' I am not referring to 'Model registration,' which pertains to the mechanism
enabling the reporting of potential models in case the user input is unexpected (e.g., when utilizing a non-existent
Boundary Condition Type). Instead, I am referring to the mechanism that enables the program to retrieve references
to various 'data' objects (such as `volScalarField`s, etc.) under the solver's direct or indirect control. Please
read this section to better understand the distinction.
{{< /notice >}}

Traditional C++ programming will likely employ a "Factory-like" design to create new objects: A virtual base class
will have a `static create()` (or a `static New()` in the case of OpenFOAM classes) to generate a pointer
(of some kind) to the newly created model.

This traditional technique is used when the programmer wants to provide users the ability to "**select**" a model
from a set of pre-defined ones (child classes of the base class).

In OpenFOAM, it is common to equip the virtual base class (usually belonging to the `Foam` namespace) with a
static `New()` method that returns an `autoPtr` pointing to the newly created instance of the model class
(`autoPtr` is used so that the created object cannot be referred to by more than _one_ pointer). Of course,
"templates" may complicate things a bit more, but nothing we can't live with.

This `New()` method would typically read the model's name from a dictionary, check if such a model is
"registered" to the RunTime selection Table, then construct an object of the appropriate type. This
process is referred to as the "selection of a model."

Older C++ code might contain overloaded versions of `New()` (each returning a different type), but 
OpenFOAM uses templates and a collection of macros to construct a `RunTimeSelectionTable` that `New`
uses to check for existence and select the model.

However, that's not the primary focus of this post. Instead, let's delve into the registration of model
data. For example, consider a scenario where a library attempts to access a field created and managed by
another library. To illustrate, suppose we have a library called `transportModels.so`, and its basic
`transportModel` class includes a member, `volScalarField rho`. Now, let's say we're working on another
library and we need a (possibly `const`) reference to this field without statically linking to
`transportModels.so`—which would result in a **cyclic dependency** between the two libraries.
How can one obtain a reference to such a field?

This is precisely the situation where object registration becomes necessary.

## OpenFOAM objectRegistry and regIOobject

OpenFOAM solvers maintain a "hierarchical database," logging objects at various levels:

- The primary registry is always the Time object (`runTime`).
- The second tier in the database logs mesh regions and the global `controlDict`.
- At lower levels, "sub-objects" are registered (e.g., each mesh region having its own
  `fvSchemes`, `fvSolution`, mesh data, the fields associated with the mesh region
  created in `createFields.H`... etc).

Note that each object in the database "can be" a database of registered objects, enabling
the hierarchical structure. When referring to "mesh regions," I'm indicating different mesh
objects (for instance, a mesh for fluids and another for solid regions in fluid-solid interaction simulations).

{{< notice "tip" >}}
If two "Time instances" are used in a solver, we would have two independent databases, and it makes complete sense!
{{< /notice >}}

For illustration, standard solvers databases would look like this:

```bash
* runTime         # objectRegistry
 |--> controlDict # regIOobject (can't have sub-entries attached to it)
 |--> mesh1       # objectRegistry (a database)
    |--> points, owner, neighbour, cellZones ...
    |--> fvSchemes, fvSolution
    |--> U, p
 |--> mesh2
    |--> points, owner, neighbour, cellZones ...
    |--> fvSchemes, fvSolution
    |--> U, p
```


{{< notice "tip" >}}
This Hierarchy is kept in memory, but the same class handles how it's written to disk.
{{< /notice >}}

The database class is called `objectRegistry` (so it's a database and an entry in a database
at the same time), and in order for objects to auto-register to a database, they must inherit
from `regIOobject` class.

The inheritance from `regIOobject` promotes the object into an auto-registered object and it
requires to implement the pure virtual member function `writeData()` (not `write()`) so that
when the database issues the order of writing to disk to all its child entries, the child will
be able to write itself properly :

```cpp
virtual bool writeData(Ostream&) const;
```

An example of a simple, non-standard class which inherits from `regIOobject` is the basic
`well` class in my
[Reservoir Simulation toolkit](https://github.com/FoamScience/OpenRSR/blob/master/libs/wellModels/wells/well/well.H).
A well can then be written to disk as a regular dictionary.

## Cross library interaction in OpenFOAM

Now that we all have a good understanding of the hierarchical registration in OpenFOAM,
let's dive into how to use such mechanism for our benefit.

In practice, when writing OpenFOAM libraries, it's common to pass a mesh reference to the
base model's constructor (You can do very little without a reference to the mesh, really).
Thus, the mesh is the number-one database to log our objects to: Which database to use is
decided at the object's construction time (by calling `regIOobject`'s  constructor with
the right third parameter). 

In standard solvers, the mesh is created by passing an `IOobject` to the constructor of
the parent class `polyMesh` which passes it to `objectRegistry`'s  constructor:

```cpp
// fvMesh is an objectRegistry
Foam::fvMesh mesh
(
    Foam::IOobject
    (
        Foam::fvMesh::defaultRegion,
        runTime.timeName(),
        runTime,    // That's the database we branch into
        Foam::IOobject::MUST_READ
    )
);
```

{{< notice "tip" >}}
And you can verify that the `Time` class is not registered to anything.
{{< /notice >}}


Now, say we registered a `volScalarField` with the name of "fName" to the previous
mesh object  (See `createFields.H` file of any standard solver for examples).
How can we refer to it in a Boundary Condition Type we're adding?

Well, that's easy, we just use `fvMesh`'s interface:

```cpp
// Const-ref to the field named fName
const volScalarField& fN = mesh.lookupObject("fName");
// Ref to the field named fName
volScalarField& fN = mesh.lookupObjectRef("fName");
```

Well, for a more sophisticated way, we may give the user the option of selecting the field's name:
```cpp
// Read the name if provided
word theName = someDict.lookupOrDefault<word>("fieldName","fName");
// Const-ref to the field named fName
const volScalarField& fN = mesh.lookupObject(theName);
```

This particular trick may complicate things for beginners with all the
"**didn't find a field in the database**" Fatal Errors, but it's a decent
way to program things in OpenFOAM. Anyway, I hope this article clarified
at least what the third argument to `IOobject`'s constructor is meant to do :smile:

If you have any suggestions or comments on this matter, don't hesitate, fire at me bellow.
