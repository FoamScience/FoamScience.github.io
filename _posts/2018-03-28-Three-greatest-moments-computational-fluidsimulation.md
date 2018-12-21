---
layout: post
title:  "The 3 Greatest Moments in Computational Fluid Dynamics History"
description: "CFD wasn't always practical: in its early days, people were doing 1000 operations per week. In this article, I'm trying to present some crucial moments in Fluid flow simulation history."
date:   2018-03-28 08:33:34
tags: 
- openfoam
permalink: /greatest-moments-computational-fluid-dynamics/
math: true
ads: true
---

The CFD knowledge you know now were accumulated over the years through Trial &
Error procedures, which lead to a continuous refinement of the concepts and
techniques used in this industry.

* greatest moments in CFD
{: toc}

Predicting simple shear flows, free and confined jet flows wasn't always a
simple task: This article showcases the most important "moments" in CFD history;
from my personal point of view of course!

{% include ad1.html %}

## The First Moment: Calculations done by humans, but they did it!

CFD was around for more than a century now: as early as 1910, **Lewis Fry
Richardson**, the father of "Weather forecasting", presented a paper, titled as
"[The approximate arithmetical solution by finite differences of physical problems
 involving differential
equations](http://rsta.royalsocietypublishing.org/content/roypta/210/459-470/307.full.pdf)"
, to Royal Society.

At that time, there were no adequate means to carry out heavy calculations, so
humans, with hand-calculators, were the most effective solution.

As you might know, CFD is heavily based on "solving" Navier-Stocks equations,
which were reduced to 1-D and 2-D equations describing physics problems on
"simple" domain geometries: Simply put, lack of computational power was
responsible for people suffering with hand calculations!!

## The Second Moment: The First Functional Model!

Engineers had to wait for a team at the Los Alamos National Lab (1957) to develop the
first (really) functional CFD model (performed with computers). The team
dedicated the next 10 years to develop even better models: You probably know 
what the $$k-\epsilon$$ turbulence model is, right?

You can find information about this big step in Fluid Flow Simulation here:
[The Legacy and Future of CFD At Los Alamos](http://collectivescience.com/documents/CFD_6_96.pdf)

Few years later, **Douglas Aircraft** was able to develop a basic 3D CFD analysis in
order to simulation fluid flow around airfoils.


But still, engineers were facing (trivial) problems back then:

- Difficulties with handling irregular boundary conditions with simple
  orthogonal grids.

- `Numerical Diffusion` was really a big problem.

- Efficient Time-dependent calculations (Just Dreams, nothing more!).


## The Third Moment: The Finite Volume Method

The Finite Volume method made its first appearance as a method to solve
Navier-Stocks Equations in 3 dimensional space around 1980 at the Imperial
College. 

This was a huge development in CFD history and important research papers kept
flowing in (considering the continuously improving computing power, this was
bound to happen!!).

In 2004, OpenFOAM was released as an "Open Source" CFD library, which boosted
researches in this area and made it available to all engineers to share code and
experience.

{% include ad3.html %}

From this point on (`This point` included ...), I think advancement in CFD-related 
subjects was (and still) based on the development of mathematics and computer programming.


I'll be happy if you could share your thoughts on this subject with us in the
comments.
