---
layout: post
title:  "5 Killer Quora Answers about OpenFOAM"
description: "Many Quora users are using OpenFOAM for their CFD simulation; In this article, we'll go through some of the most important questions and answers there."
date:   2018-03-20 08:46:02
tags:
- openfoam
- post-processing
- gui
permalink: /5-killer-quora-answers-on-openfoam/
image: /assets/img/quoraAnswers/5-killer-quora-answers-openfoam.png
ads: true
---

There are **1.3K** `OpenFOAM` topic followers on Quora out of a total of **23.1K** `CFD` 
topic followers. I know this is probably not an accurate way to estimate how
many Quora users use OpenFOAM for their CFD simulation, but, at least, it gives a rough
estimate of how many Quora users are watching for OpenFOAM-related questions.
<!--more-->

* Quora questions OpenFoam
{: toc}

Personally, I wasn't watching them until the moment I decided to summarize
interesting answers about OpenFOAM in this blog post.

So, let's get started.


## Will I learn CFD better using OpenFOAM as compared to Ansys CFD?

When a user asked this question, he was, apparently, looking for an advice on how
to learn **Computational Fluid Dynamics**, and what piece of software should he
use to learn it.

Answers seem to emphasize on the fact that **OpenFOAM** is an `Open Source`
software which makes learning **CFD** easier.

Going down the **OpenFOAM** road has the following benefits:

* Makes people learn all sorts of things: Numerical analysis, C++ (even Python in my case) coding,
and the physics of things.

* Has a welcoming community which will help out if needed.

* Allows (and encourages) you to **read** the "source code" of all libraries, solvers and
utilities!! Actually, this a big help even if you don't understand C++ at
all!

If one chooses to work with Commercial Software, he will benefit from:

* Their GUI, probably; If he is a GUI person (Windows users mostly).

* Integrated `Optimization` and `Parameterization` facilities (In OpenFOAM case, we
  usually use **DAKOTA** for this).

* Dedicated support (hopefully).

* The learning curve (The software's learning curve) is often shorter that
  OpenFOAM's.

The ability to see what's actually going on behind the scenes has always been a
big plus for open source software.  

{% include ad1.html %}

## Does OpenFOAM come with an integrated GUI?

> Simply put: The answer is "there is no official graphical user interface for
> OpenFOAM!"

I don't get why people keep fixating on that! There is little need to a GUI, so
official releases don't include one.

In addition, most OpenFOAM users run a great deal of their simulations in Ubuntu servers, thus
they will be interacting with the command line the whole time anyway.

The answers for this question feature some useful (for absolute beginners) GUI
applications:

* [SimFlow](https://sim-flow.com): A really good GUI application which uses
  standard OpenFAOM solvers and utilities to solve basic CFD problems. It allows
  the integration of custom solvers but sets a low limit on `mesh cell count`.

* [SimScale](http://simscale.com): A platform integrating OpenFOAM solvers and
  providing free online CFD projects.

But I find it a bit weird that no one mentioned the very useful [wiki page](https://openfoamwiki.net/index.php/GUI)
which holds all major open source, free and commercial GUIs built for OpenFAOM (Even the
text-based one: **pyFoam**)

## Does it matter what version of OpenFOAM you use?

OpenFOAM versions and forks can easily confuse new comers: I mean there are many versions for official
releases, extend project releases, OpenFOAM for Windows ... and the list goes
on. So, It may be quite difficult for a new Open-Source software  follower to
distinguish between their features.

Answers on Quora on this question claim, and I agree with them, that:

* If you are just starting to learn OpenFOAM, it doesn't really matter which
  version you use as long as it's a not-so-old version. You are one release
behind? that's OK.

* If you want to solve a specific problem, It's good to have both the newest
  stable official version along side a `foam-extend` fork; It has many community
  additions that may be of some use in your case.


I think It's worth mentioning that OpenFOAM I/O (Input Output) format has
changed only once in 20 years, so, this probably something you shouldn't worry
about (especially if you are a beginner who uses newer versions only).

>Choosing an OpenFOAM fork to work with is really a matter of preference; just
>get the latest stable version of that fork!

## OpenFOAM users, what is the biggest bottleneck in using it? CAD to meshing, solver, parallel performance (scalability), or post-processing?


Let's first present some user feedback for this question:

* CAD to OpenFOAM Mesh (people were using ~OF2 at that time) is considered painful.
* PISO and PIMPLE based solvers are hard to follow up (harder than basic ones at
  least) because things are done implicitly!
* Post-processing tools are good (Talking about **ParaView** here, I think).

Some users also report the lack of a GUI as an inconvenience, but this is their
opinion; Personally I think that:

{% include ad2.html %}

* Meshing is no longer an issue: `snappyHexMesh` and the great `cfMesh` are up
  for the task now (see my [OpenFOAM Utilities Roundup
1](/openfoam-utilities-roundup-first/) if you want
to know more).
* Native post-processing is getting better with every release!
* The learning curve is steep: That's what most people should focus on. May be
  using a GUI first can help with this problem?

You really need to take a look at the "Utilities Roundup" post; It has
interesting tricks that might be helpful when learning OpenFOAM.

## How can I learn the workings of the source code for OpenFOAM?

>Ho-Ho, this may take some time!!

Here are the steps that I think they would give nice results in a reasonable
time period:

* Master **C++ Programming**: Are you a **C** programmer? Do you think you can
   handle programming in OpenFOAM? Well, think again, you really need to take a
course on **C++** because OpenFOAM heavily uses its Object Oriented features.

* You need to completely master you field of study (what are you programming
  OpenFOAM solvers/models for).

* Locally build The documentation (using **Doxygen**): It will be helpful.

* May be take a course, or use online resources to master the use of different
  OpenFOAM classes.


If you have any suggestion or feedback about this post, don't hesitate to
comment below.
