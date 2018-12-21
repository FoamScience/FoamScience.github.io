---
layout: post
title:  "Permeability Simulation with OPENFOAM and OPENPNM"
description: "Simulating flow through 2D porous media with OpenFOAM (Complex goemetry) and OpenPNM (network modeling)."
date:   2018-01-02 09:00:13
tags:
- openfoam
- porous-medium
- openpnm
- python
permalink: /permeability-simulation-with-openfoam-openpnm/
image: /assets/img/permeabilitySimulation/permeability-simulation-pressure-openfoam.jpg
ads: true
---

Permeability and Filtration coefficient are a must-know factor for oil/gas reservoir management and optimization. **OpenFOAM** and Network-based software (**OpenPNM** for example) are our chosen open-source software toolkits for permeability simulation.

* Simulation porous materials with OpenFOAM
{: toc}

It's hard to define an audience for this paper, really. Any one who wants to:

 * Kill the time by learning about permeability of soils, or
 * Prepare for a numerical simulation of permeability of soils

And understands the basics of:

 * Flow through porous medium,
 * OpenFOAM, or Python programming language,
 * Image processing (we are using **FIJI** -**F**iji **I**s **J**ust **I**mageJ- )

Should be able to benefit from this presentation and related files (The way I 
presented it: Split it up to parts and give each part to the appropriate audience).

<picture>
   <source srcset="/assets/img/permeabilitySimulation/openfoam-pressure-permeability-results.webp" type="image/webp">
   <img src="/assets/img/permeabilitySimulation/openfoam-pressure-permeability-results.png" alt="OpenFoam
permeability simulation">
</picture>

## Abstract

One of the most important properties of hydrocarbon reservoirs is their capacity of passing fluids; ie, their permeability to fluids in questions. The engineering knowledge have accumulated over the years to explain, optimize and use the behavior of reservoirs in this matter.

With a great focus on granular reservoirs, this presentation introduces key concepts regarding this interesting property of rocks, including the most effective way of comparing two reservoirs in respect to their permeability: The use of permeability coefficient; In addition, we've tried to present the most important factors affecting rock permeability, and how they affect it.

Based on these factors, several mathematical models -adhering to certain conditions- were formed; we've picked two well-known well-accepted models to feature: Kozeny-Carman (relatively simple porosity-permeability relationship); Happel-Brenner (more complex porosity-permeability relationship).

With their "very limited" porosity range, these models fail in predicting the permeability of many rock sample; especially if they require the determination of grain shape descriptors (sphericity, roundness ... etc). 

Thus, results from mathematical predictions are always treated with caution; The most accurate method to estimate permeability of a sample rock to a certain test fluid is to actually measure it (More precisely, calculate it from measured data). This paper features the most-common permeability tests methods (Principle: apply pressure gradients, measure the outgoing flow rate, and use Darcy's law to determine permeability). We've also tried to show how field-based methods (Well tests and logs) are used to calculate permeability.

{% include ad1.html %}

To formulate a better understanding of this concept, we've tried to use common simulation approaches to determine the permeability of a piece of porous material (a 2-D 1.024mm*0.728mm image generated with `porespy` -a Python Library-):

* Directly simulate a viscous flow through medium's pores using OpenFOAM (The most trusted method).
* Instead of real pore (complex) geometry, assemble the porous material to a network of spheres (pores) connected by cylinders (throats), and solve the flow there, using openPNM -also a Python Library-.

{% include ad2.html %}

## Downloads 


> **Note:** **PDF** files are meant to be opened with `evince` (don't complain about animations if you use Adobe Reader); **OpenFOAM** cases are packaged in a ready-to-mesh-and-run state, and **python scripts** are meant to show the typical work-flow - not to provide fully-featured applications -.

 <a href="https://www.slideshare.net/ElwardiFadli/permeability-of-soils" class="btn">Presentation File</a> 
 <a href="http://drive.google.com/uc?id=1eBVsfmtI6_5wTZXx2mo_BStNigOdLF2r&export=download" class="btn">OpenFOAM Case (.7z)</a> 
 <a href="https://drive.google.com/uc?id=16FrDxyDcyaxj9KQIND6rI1mxQEdpr4KJ&export=download" class="btn">Python stuff</a> 
 <a href="https://drive.google.com/uc?id=1F65s__fS8RzqrLwfZcVWKkjHNNCPITg-&export=download" class="btn">Latex sources</a> 

## Contribution and improvements

Any suggestions and remarks are welcomed through Comments, or by e-mailing me.
