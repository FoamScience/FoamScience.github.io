---
layout: post
title:  "OPENFOAM utilities Roundup 1"
description: "Introducing the most common utility software that are related to simulating fluid flow following OpenFOAM work-flow."
date:   2018-03-16 19:04:12
tags: 
- openfoam
- meshing
- post-processing
permalink: /openfoam-utilities-roundup-first/
image: /assets/img/utilRoundup/openfoam-utilities-roundup-1.png
ads: true
---

While working on any OpenFOAM case, users frequently find themselves in need of
a tool to perform a specific task, in a specific way. This article 
identifies some of the best available utilities associated with OPENFOAM's workflow.
<!--more-->

* OpenFOAM utilities
{: toc}

There are several conditions for a utility to gain a place in this list 
(That's how I choose the tools I work with anyways):

1. It has to be free.
2. It has to be efficient enough (Both machine-wise and user-wise).
3. It has to deliver quality results.
4. It has to be customizable to some extent.
5. It has to be scriptable (for parameter variation ... etc).

>Note: Utilities are not required to be "cross-platform";
>If not mentioned otherwise, they are designed to work in Unix-like systems.


This post tries to mention some useful OpenFOAM utilities that every OpenFOAM
user should know of; and we'll be glad if you can share your experience with
these tools (and any others) with us in the comments section.

## Meshing utilities


Let's start with the (probably) most important step in any **CFD simulation**; the
`meshing phase`. Finding a decent meshing tool is crucial for the accuracy of
your simulations; and what's more important is the amount of time `you` spend on
meshing the domain.

For me, thinking about what strategy to take when attempting to mesh a domain is
worth several minutes, (See the **meshing phase tutorial** in [The S01L001
simulation]({{ site.baseurl }}/simulations/s01l001) for more information).

However, time needed for the machine to produce a good mesh should also be kept
minimal: This is where the meshing utility's efficiency can shine.

### CfMesh

[CfMesh](https://cfmesh.com) is a really great cross-platform meshing utility.
It delivers quality meshes starting from (possibly coarse) surface geometries. 
The amusing thing is that it only requires the presence of a small dictionary 
file called `meshDict` describing few mesh settings (`maxCellSize` ...etc).

{% include ad1.html %}

Let me present some of its features:

* Built on top of **OpenFOAM**; which means it tries to generate OpenFOAM valid
  meshes whenever possible.
* Can construct 3D hexahedral, tetrahedral and polyhedral meshes.
* Also capable of generating 2D hex-meshes.
* Parallel computing is supported (using MPI).
* The mesh is created from geometries in the form of surface triangulation (.STL
  or .FMS files); which can be coarse (to some extent).
* Takes into account _geometry patch names_ if you want it to.
* The `meshDict` file has to contain only two entries (one pointing to the path for
  the geometry file, and the other featuring the `maxCellSize`)
* Automatic and local mesh refinement.

This tool has quickly become my _favorite meshing_ utility mainly because:

1. It saves me the trouble of going through `snappyHexMesh` dictionary file.
2. I already know how to quickly create STL geometry files using CAD tools. 

If you want to see it in action, go through the [S01L001 Simulation]({{
site.baseurl }}/simulations/s01l001).

### Mesh Converters

Sometimes, you may want to work on an _existing mesh_: But the mesh is
in another format. In this case, you may want to execute the following commands:

{% highlight bash %}
$ util
$ ls mesh/conversion
{% endhighlight %}
to discover what standard OpenFOAM mesh conversion tools are available.

The most important ones are probably:

{% highlight bash %}
$ gmshToFoam -help
$ gambitToFoam
{% endhighlight %}

## Post-processing

Visualizing case results is another important step in OpenFOAM workflow, and for
that, we'll need capable tools (in addition to the well-known **ParaView**):

### postProcess

`postProcess` is the standard post-processing utility which is shipped with
official OpenFOAM releases. It does nothing more than "executing"
specified `functionObjects`.

Here are some common uses for this tool from the command line:

{% highlight bash %}
$ postProcess -func "flowRatePatch(name=outlet)"
$ postProcess -func "patchAverage(name=outlet,U)"
{% endhighlight %}

The usage of this tool from the command line seems to be a _bit confusing_ for new
OpenFOAM users; So, let's see how a typical get-to-know-this-utility workflow
goes:

> As a general advice; The source code and the user guide are great resourses
> (Probably the best ones)


* First, users are encouraged to read the help section:
{% highlight bash %}
$ postProcess -help
{% endhighlight %}

* Which leads to an important conclusion: The utility accepts to run a `functionObject`
specified by the `-func` option.

* Now, we only need to figure out how exactly the function object is specified;
  thus, we try:
{% highlight bash %}
$ postProcess -list
{% endhighlight %}
to list what types of functionObjects are ready to use; Then:
{% highlight bash %}
$ postProcess -func flowRatePatch
{% endhighlight %}

* This command will throw a `FOAM_FATAL_ERROR` because the utility simply can't find
any information about the target patch (its `patchName`).

* Run the following command to locate any flowRatePatch-related files:
{% highlight bash %}
$ locate -i flowRatePatch
{% endhighlight %}
We are specifically interested in these two files:
{% highlight bash %}
/opt/openfoam4/etc/caseDicts/postProcessing/flowRate/flowRatePatch
/opt/openfoam4/etc/caseDicts/postProcessing/flowRate/flowRatePatch.cfg
{% endhighlight %}
Of course, the first one is the main file, and the second is just a
configuration one.

* Opening the first file in a text editor reveals all the secrets we are seeking:
{% highlight cpp %}
/*--------------------------------*- C++ -*----------------------------------*\
  =========                 |
  \\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox
   \\    /   O peration     |   
    \\  /    A nd           | Web:      www.OpenFOAM.org
     \\/     M anipulation  |
-------------------------------------------------------------------------------
Description
    Calculates the flow rate through a specified patch by summing the flux on
    patch faces.  For solvers where the flux is volumetric, the flow rate is
    volumetric; where flux is mass flux, the flow rate is mass flow rate.

\*---------------------------------------------------------------------------*/

name    <patchName>;

#includeEtc "caseDicts/postProcessing/flowRate/flowRatePatch.cfg"

// ************************************************************************* //
{% endhighlight %}

{% include ad3.html %}

The `name` keyword is responsible for holding the target patch name; This is why we
must invoke `postProcess` passing a `name` to the functionObject:

{% highlight bash %}
$ postProcess -func "flowRatePatch(name=outlet)"
{% endhighlight %}

> We don't really care, but the include statement loads up this functionObject's
> configuration.


I hope this post was helpful; if you have any useful suggestions, you are
encouraged to share them with us in the comments section.

