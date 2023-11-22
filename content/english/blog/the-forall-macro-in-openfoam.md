---
title: "The forAll Macro in OpenFOAM"
description: "Guys, forAll is just a User-defined shorthand for standard CPP 'for', OK!"
meta_title: ""
date: 2018-08-29T08:00:00Z
image: "/images/forAll-openfoam-cpp.png"
categories:
  - programming
author: "Mohammed Elwardi Fadeli"
tags:
  - OpenFOAM
  - C++
draft: false
---

Because of the frequent use of range-like loops in OpenFOAM (in the official code base, forks, and any independent work, for that matter), the developers have provided a "shortcut" to loop through all elements of a list—any list. This post aims to address the common misuse of this shortcut. Believe it or not, people abuse the `forAll` macro in every possible way.

## The forAll macro and its “friends”

First of all, we all know that `forAll` is not part of C++, so it is a user-defined macro. Assuming a recent fork/version of OpenFOAM is sourced, the definition of this macro and similar ones can be found by running the following shell commands:

```bash
cd $FOAM_SRC/$WM_PROJECT
grep -r . -e "define.*forAll"
```

The previous command reveals that there are at least four (4, foam-extend has some more) defined macros to loop through "collections":

1. The good old `forAll` and its reversed-looping version `forAllReverse`.
2. A `forAllIter` macro specialized in iterating over a Container using an "iterator" and a const-version of it.

Yep, browsing source code is extremely useful (These macros are defined in `UList.H`).

People need to understand that `forAll(list, i)` is "just" a shortcut to `for (int i=0; i<(list).size(); i++)`.
Although i is actually a `Foam::label` in standard OF versions. Strictly speaking; the macro just "works" on any container that has a `size()` member method (Think of it as a vector of a known size - at construction time). Such containers will probably (publicly) inherit from the `UList` (The most lightweight-efficient base class for vector-like lists of elements with contiguous storage).

Let's examine a very simple example of constructing a `scalarList` (a `List<scalar>`, publicly inheriting from `UList<scalar>`).
```cpp
#include "fvCFD.H"

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
int main(int argc, char *argv[])
{   
    // Create a list of some scalars
    scalarList someScalars(10, 0);

    // Perfectly fine use of forAll
    forAll(someScalars, sc)
    {
        someScalars[sc] = doSomeCalculations(sc);
    };

    Info<< "End\n" << endl;
    return 0;
}
```

But this may be misleading; what if someone uses the macro to loop over a “different” type of container, say a dictionary? Is `forAll` suitable for such tasks?

The answer is in the previous example, actually: Common use of `forAll` requires the list object to

- Have a `size()` member method.
- Be efficiently indexable with some method/operator (`operator[]` in this case). Otherwise, there is no benefit in looping through some collection if you can't access its elements!!

So, if dictionary objects verify these requirements; we're golden.

In fact, the `DictionaryBase` Template class publicly inherits from the [Link] List Type it is templated on. It's easy to follow the inheritance diagram of the most commonly used class dictionary to see that there is no `size()` method defined anywhere. Also, how would one refer to an entry as `dictionary[i]`??

It should be obvious now that `forAll` is not the right macro to use in this case. That's where the second family of macros kicks in: Instead of using a (possibly more efficient) predefined-size container, some situations require the use of “more dynamic” ones that only hold “pointers” to their begin/end positions. An iterator is then used to go back and forth between these positions.

A nice usage of this macro can be found at line 175 of [solution.C](https://cpp.openfoam.org/v7/solution_8C_source.html) file so newer versions of OpenFOAM would understand the older specification of `fvSolution.solver`.

The const-iter version of `forAllIter` is also used to read entries of a dictionary into a HashTable… 
you can find an example at line 146 of [HashPtrTableIO.C](https://cpp.openfoam.org/v7/HashPtrTableIO_8C_source.html).


## A word on UList in OpenFOAM

As far as I can tell, this class is just “well written” - “well thought through”. Its purpose is to provide an efficient base class for “Sub-Lists”. A quick look on the list of classes that directly inherit from it shows how important `UList` is.

By the way, the class also holds a random access iterator; so it can be used with `forAllIter`: We use an object (usually called iter) to “point” to a list item each time we iterate. The list item itself is accessed by dereferencing the pointer (*iter).

I'm not aware of a way to get the “index” of an element in a List; It would be inefficient! So I never bothered to search for one. Another thing I should point out is that std::distance probably won't work without some serious Type Casting :). It's (was?) dangerous anyway, and I don't know if a similar function is available for OpenFOAM iterators).

In fact, the use of `std::distance` takes away one the most important features of iterator-based loops:
The ability to loop through a container where either `.begin()` or `.end()` is not reachable from the other (possibly by incrementing iter) as it results in “undefined behavior”.


{{< notice "note" >}}
In recent OpenFOAM versions, `GeometricField` (`volScalarFields` …) inherits from `UList`, so, one can typically loop through their elements with both macros; although template specializations specialize the sense of “loop through their elements”: Some types support looping through `internalField`; others make it so the loop hits everything.
{{< /notice >}}

## A word on dictionary in OpenFOAM

This class a good example of a lot of things. “An iterator-based container” as I introduced it in this post is just the tip of the iceberg. The reason I chose it for this post is that most OpenFOAM users consider a dictionary to be a “list” which is not entirely true. The similarity of, for example, getting some IDs (0, 1, 2, 3 … ) for mesh patches from the boundary files does not mean a dictionary is indexable (I'm talking about “old-fashion” indexing here).
