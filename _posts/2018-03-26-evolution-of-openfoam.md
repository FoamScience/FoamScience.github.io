---
layout: post
title:  "The Evolution of OpenFOAM"
description: "OpenFOAM was first open sourced in 2004, which initiated a series of open source releases that introduced new interesting features and slowly made the software as powerful as the main CFD commercial products."
date:   2018-03-26 10:22:10
tags:
- openfoam
- evolution
permalink: /openfoam-evolution/
image: /assets/img/evolution/openfoam-evolution.jpg
ads: true
---

OpenFOAM was originally a commercial product called **FOAM**, and it was
first released as an "Open Source Software" in December 2004 (Under the [GNU
GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License), renamed
OpenFOAM since then). 
<!--more-->

* OpenFOAM history
{: toc}

This act had great effects on OpenFOAM's user base and started to build a vast
caring community. In this post, I'm going to showcase the major improvements
introduced to OpenFOAM (official) code from the beginning (`OF1.0`) up until now 
(`OF5.0`).


## OPENFOAM 1.x

At the beginning, the development focused on user interaction with the software
(mainly compiling errors and similar stuff). After few partial versions, `OF1.4`
came with the first noticeable efficiency improvements:

* A new compressible two-phase flow (**cavitation**) was added.
* Porous media models were introduced for the first time.
* Implementation of Multiple reference frames (MRF).

The next few releases have introduced new applications (meshing, case
initialization, functionObjects and post-processing) and libraries (radiation 
modeling, LES & RAS turbulence models, basic mesh motion ... etc).

And before reaching `OF2.0`, many numerical polynomial-fit higher-order
interpolation schemes were added (linear, quadratic, cubic), and many new
boundary conditions were added and improved in association with new library
development (Turbulence and thermophysical modeling).

{% include ad2.html %}

## OPENFOAM 2.x

`OF2.0` was the first release that officially supported some Linux distributions
(Binary Deb packages for Ubuntu and .RPM ones for SUSE).

On the technical side, it is worth mentioning that a "local-time stepping,
Steady-state VoF (Volume of Fluid) " method was introduced to OpenFOAM in this 
release.

The next releases, up until `OF3.0`, added support for  Fedora Linux while
continuing to improve efficiency of the code and introducing new features:

* Arbitrary mesh interface (AMI): Rotation of geometries and more flexibility 
when using cyclic boundaries and coupling simulations between separate mesh 
regions (e.g. surface film and bulk flow)

* Meshing tools got interesting features: They had new useful options. 
1. `snappyHexMesh` features and capabilities were on fire during this cycle of 
releases.
2. `checkMesh` learned how to listen for user-specified mesh quality
settings.
3. `decomposePar` and `reconstructPar` were improved for multi-region
   simulations handling.

* `fvOptions` used for source/sink specification in `OF2.2.0` (How they were
  doing this before?). 

* Migration to **Doxygen** to generate code documentation.

* Macro expansions and regular expressions in keyword names were first
  introduced for the first time in `OF2.2.2`.

* And Hey! `OF2.3` came with a new meshing tool `foamyHexMesh`.

* Pre-processing tools also got a boost in terms of efficiency and user
  convenience.

>In general, any complains about meshing tools originate from this era :)

## OPENFOAM 3.x

With the release of `OF3.0.0` things got a lot more interesting (from the user
perspective at least):

* `blockMeshDict` moved to **system** directory
* Official packages supported only Ubuntu
* **fvSchemes** no longer requires the dictionary `fluxRequired`
* Many regions of the code were redesigned to improve consistency and make it
  easier to work with.

This release focused mainly on turbulence models:

* it gave **turbulenceProperties** the ability to select any turbulence model
  instead of using the old **RASProperties** and **LESProperties**

Also, many of you may not know this, but `blockMesh` learned how to overcome the particular
vertex ordering when constructing block faces in this release!

This basically means that:

{% highlight cpp %}
    fixedWalls
    {   
        type wall;
        faces
        (
            (0 7 4 3)
            (2 6 5 1)
            (1 5 4 0)
        );
    }   
{% endhighlight %}

Is the same as

{% highlight cpp %}
    fixedWalls
    {   
        type wall;
        faces
        (
            (0 4 7 3)
            (2 1 5 6)
            (1 5 4 0)
        );
    }   
{% endhighlight %}

> You can try this immediately on a tutorial case!!

Teaching the tool the ability to find the appropriate ordering of face vertices
on its own helped a lot with improving its "scriptability".

Many input-related improvements were performed, for example, the following
entries are all valid starting from this release:


{% highlight cpp %}
nu              nu [0 2 -1 0 0 0 0] 0.01;
nu              [0 2 -1 0 0 0 0] 0.01;
{% endhighlight %}

You can also omit the dimensions specification and write:

{% highlight cpp %}
nu              0.01;
{% endhighlight %}

But it's not recommended to do so.

After `OF3.0.0`, `OF3.0.1` was released to fix some bugs and help programmers
with the development of new applications:

* `foamNewBC` and `foamNewApp` now create templates for boundary conditions and
  new applications (solvers, utilities).

## OPENFOAM 4.x

`OpenFOAM 4.0` introduced many improvements to the user interface:

* `foamDictionary` prints and modifies dictionary content.

* `foamListTimes -rm` removes time directories (but not **0** dir.): Use this
  instead of struggling with regular expressions.

* We used to `grep` things if we want to know how a keyword is used (and I still
  do), but the new `foamSearch` is a great tool for this task.

* All old post-processing (small, one-task-oriented ) tools are fused into a single one:
`postProcess`

* Many `functionObjects` are re-factored.

* A load of new BCs are added, with **noSlip** standing out!!

* `foamList` lists models used in OpenFOAM (`-functionObjects`, `-scalarBCs` ...
  etc).

As usual the version after this one (`OF4.1`) only fixed some bugs.

## OPENFOAM 5.x  [Updated: 17/08/2018]

{% include ad3.html %}

OpenFOAM can now be installed conveniently on **Windows 10** machines using
Microsoft's **Windows subsystem for Linux**.


The first thing I noticed when using OpenFOAM 5 for the first time is that solvers
and utilities know about bash-TAB completion; the new `-list*` options for the 
commands are very useful (try `-listScalarBCs`).

New Function Objects were introduced including the handy `flowRateFaceZone` which 
calculates flow rate through a face zone (wasn't possible before without using `SWAK4FOAM`
function objects).

The release also improves some ramp functions and adds some, though I'm not a fan
of those functions!!

> For the technical details on what new things `OF5.0` offers, head to 
> [OF5 Release Info Page](https://openfoam.org/release/5-0/); I think you ready for
> that now!!

## OPENFOAM 6.0  [Updated: 17/08/2018]

OF6 is being tested by regular users for more than a month now, including me, and I love it.
The focus mainly goes to making OpenFOAM a more user-friendly software:

- Remember using DyM versions of solvers? Well, that's deprecated because now, standard solvers
are able to handle mesh motion natively instead of using specialized versions of the same
solver.

- There is no need to copy `0.orig` to `0`; Initial and boundary conditions are now read
  from both directories automatically.

- A new `atmosphericModels` library which I missed for a while now!!


> More exciting changes at:
> [OF6 Release Info Page](https://openfoam.org/release/6/)
