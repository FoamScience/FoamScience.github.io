---
layout: post
title:  "5 Faux-Pas That Are Actually Okay to Make in OpenFOAM Simulations"
description: "Doing CFD with OpenFOAM is fun! But it requires the knowledge of many general rules that cannot be breached; This article features some crimes that are actually Okay to commit in the OpenFOAM world."
date:   2018-04-13 09:08:13
tags: 
- openfoam
by: F.M.Elwardi
permalink: /faux-pas-okay-to-make-in-openfoam-simulations/
image: /assets/fauxpasOpenFoam/faux-pas-okay-openfoam-simulations.png
ads: true
---

OpenFOAM beginners often find it really hard to get a case to work; which is a
'consequence' of several factors (I'm not talking about syntax typos here!):

* Bad `mesh`.
* Bad `numerical schemes`.
* Bad `solver` parameters.

But it's not about the things you do to break your case -You can learn about
those ones by yourself- : It's all about the **bad things** you do to your case
that have no to little effect on the results!!
<!--more-->


* OpenFOAM simulation mistakes
{: toc}

## #1: Omitting important stuff in the dictionaries

I've talked about this particular issue in an earlier post: 
[OpenFOAM Evolution](/openfoam-evolution/) where I
mentioned that, starting from OpenFOAM 3.0, users can use any of the following
`keyword-value` variations to express `nu` in the standard units:
 
{% highlight cpp %}
nu              nu [0 2 -1 0 0 0 0] 0.01;
nu              [0 2 -1 0 0 0 0] 0.01;
nu              0.01;
{% endhighlight %}

Note that the last one is particularly dangerous: You absolutely shouldn't put
something that mysterious in your case files, especially if the case is run
with a custom solver! 


## #2: The numerical schemes

Most of OpenFOAM beginners prefer to stick with the default numerical
schemes they find in the tutorial cases; which is considered as "good practice"
until you get excited and try to simulate something different from what the
tutorial simulates.

Even though OpenFOAM developers do a great job choosing perfect numerical
schemes for tutorial cases, your case may require a slightly different scheme to
be used.


That's why I like to fall back to `upwind` schemes whenever I'm confused! This
is probably a bad idea!! But `upwind` schemes work! They really do!! Almost
always: They may not give the most accurate results in specific circumstances though.

{% include ad1.html %}

As an unspoken rule, starting simulations with:
* `leastSquares` as `gradSchemes` Unless you notice oscillations in the
  calculations of gradients (happens if the mesh is of bad quality), then fall
  back to `Gauss linear`.
* `upwind` or even `linearUpwind` as `divSchemes`
* `linear limited some_value` as `laplacianSchemes` (Where `some_value` is 1 if
  the mesh is orthogonal, and decreases towards 0 as the mesh gains
  non-orthogonality).

## #3: Mesh Quality

You should never skip checking mesh quality with `checkMesh`; It's crucial to
know the properties of your mesh:

* If the non-orthogonality is greater than 70, you should consider using non-orthogonal
  correctors.
* If skewness is greater than 15, consider refining the mesh.

The general rule says: If a hex-mesh's non-orthogonality is > 80, this mesh is not a
valid one.

However, it's possible to tolerate high non-orthogonality values under some
circumstances: For example, if non-orthogonal cells are not contributing to the
flow.

## #4: OpenFOAM multiple versions

Working with multiple versions of OpenFOAM is easy:

* You create aliases for installed versions of the software (in `~/.bashrc`
   file):
   {% highlight bash %}
   # OpenFOAM versions
   alias fe32='source /opt/foam-extend-3.2/etc/bashrc'
   alias of4='source /opt/openfoam4/etc/bashrc'
   alias of5='source /opt/openfoam5/etc/bashrc'
   {% endhighlight %}
* When you open the terminal you only need to issue the command `of5` to load
   OpenFOAM 5.
* When you are done with it, run `wmUnset` to unload the shell environment and
   use another version of the software in the current terminal.

Note that this is the safest way to do this, but it's also OK to omit unloading
the environment if you are just simulating cases.


## #5: The writeFormat

Writing OpenFOAM output in ASCII format is not always a good option; if there is
too much information to write you may run out of space or crush your system.


In general, it's better to write the output as binary files, and compress them
with `gzip`. the only drawback of this approach is that the risk of damaging
these files increases and there is no way to repair them if this happens!
{% include ad2.html %}

> Except that you could re-run the simulation for the damaged `timeSteps`, of
> course.

I would be happy if you share your experience in this subject with us in the
comments sections.
