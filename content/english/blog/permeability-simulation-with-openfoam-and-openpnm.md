---
title: "Permeability Simulation with OPENFOAM and OPENPNM"
description: "Compare Network-based models to CFD simulations in porous mediums"
meta_title: ""
date: 2018-01-02T08:00:00Z
image: "/images/openfoam-pressure-permeability-results.png"
categories:
  - porous-medium
author: "Mohammed Elwardi Fadeli"
tags:
  - OpenFOAM
  - Pore-network
  - Permeability
  - OpenPNM
  - PoreSpy
  - Python
draft: false
---

Permeability and Filtration coefficients are some must-know factors for oil/gas reservoir management and optimization.
**OpenFOAM** and Network-based software (**OpenPNM** for example) are our chosen open-source software
toolkits for permeability simulation.

It's hard to define an audience for this presentation, really. Anyone who wants to:
- Kill the time by learning about permeability of soils, or
- Prepare for a numerical simulation of permeability of soils

And understands the basics of:
- Flow through porous medium,
- OpenFOAM, or Python programming language,
- Image processing (we are using FIJI -- Fiji Is Just ImageJ -- )
Should be able to benefit from this presentation and related files (The way I presented it: Split it up to parts and give each part to the appropriate audience).

## Abstract

One of the most important properties of hydrocarbon reservoirs is their capacity of passing fluids; ie, their permeability to fluids in question. The engineering knowledge have accumulated over the years to explain, optimize and use the behavior of reservoirs in this matter.

With a great focus on granular reservoirs, this presentation introduces key concepts regarding this interesting property of rocks, including the most effective way of comparing two reservoirs in respect to their permeability: The use of permeability coefficient; In addition, we've tried to present the most important factors affecting rock permeability, and how they affect it.

Based on these factors, several mathematical models -adhering to certain conditions- were formed; we've picked two well-known well-accepted models to feature: Kozeny-Carman (relatively simple porosity-permeability relationship); Happel-Brenner (more complex porosity-permeability relationship).

With their “very limited” porosity range, these models fail in predicting the permeability of many rock sample; especially if they require the determination of grain shape descriptors (sphericity, roundness … etc).

Thus, results from mathematical predictions are always treated with caution; The most accurate method to estimate permeability of a sample rock to a certain test fluid is to actually measure it (More precisely, calculate it from measured data). This paper features the most-common permeability tests methods (Principle: apply pressure gradients, measure the outgoing flow rate, and use Darcy's law to determine permeability). We've also tried to show how field-based methods (Well tests and logs) are used to estimate permeability.

To formulate a better understanding of this concept, we've tried to use common simulation approaches to determine the permeability of a piece of porous material (a 2-D 1.024mm×0.728mm image generated with **PoreSpy** - a Python Library -):


- Directly simulate a viscous flow through medium's pores using OpenFOAM (The most trusted method).
- Instead of real pore (complex) geometry, assemble the porous material to a network of spheres (pores) connected by cylinders (throats), and solve the flow there, using PpenPNM - also a Python Library -.

## Downloads

{{< notice "note" >}}
PDF files are meant to be opened with evince (don't complain about animations if you use Adobe Reader);
OpenFOAM cases are packaged in a ready-to-mesh-and-run state, and python scripts are meant to show the typical
workflow - not to provide fully-featured applications.
{{< /notice >}}

{{< tabs >}}
{{< tab "Presentation File" >}}
The presentation file can be downloaded from SlideShare:
{{< button label="Download" link="https://www.slideshare.net/ElwardiFadli/permeability-of-soils" style="solid" >}}
{{< /tab >}}
{{< tab "OpenFOAM case (.7z)" >}}
The following Google Drive link gets you access to the corresponding OpenFOAM case:
{{< button label="Download" link="http://drive.google.com/uc?id=1eBVsfmtI6_5wTZXx2mo_BStNigOdLF2r&export=download" style="solid" >}}
{{< /tab >}}
{{< tab "Python Stuff" >}}
You can also get the OpenPNM/PoresSpy scripts too:
{{< button label="Download" link="https://drive.google.com/uc?id=16FrDxyDcyaxj9KQIND6rI1mxQEdpr4KJ&export=download" style="solid" >}}
{{< /tab >}}
{{< tab "Latex Sources" >}}
If you're interested, Beamer Latex sources are also available:
{{< button label="Download" link="https://drive.google.com/uc?id=1F65s__fS8RzqrLwfZcVWKkjHNNCPITg-&export=download" style="solid" >}}
{{< /tab >}}
{{< /tabs >}}
