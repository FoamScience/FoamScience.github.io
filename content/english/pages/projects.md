---
title: "OpenFOAM-related Projects"
meta_title: ""
description: "Interesting OpenFOAM-related projects"
draft: false
---


{{< tabs >}}
{{< tab "Better OpenFOAM Tooling" >}}

#### <i class='fab fa-github'></i> Well-tested OpenFOAM code
[FoamScience/foamUT](https://github.com/FoamScience/foamUT)

A unit/integration testing framework to help test-proof new OpenFOAM code.
It will **always** work with the latest versions of the main three OpenFOAM
forks: ESI OpenCFD's, Foundation version and Foam-Extend.

#### <i class='fab fa-github'></i> Good-looking OpenFOAM files
[FoamScience/tree-sitter-foam](https://github.com/FoamScience/tree-sitter-foam)

A generic fail-tolerant parser for OpenFOAM case dictionaries. The goal is to reach a state
that is "good enough" for syntax highlighting and feasible symbols extraction.


#### <i class='fab fa-github'></i> Editors to understand OpenFOAM dictionaries
[FoamScience/foam-language-server](https://github.com/FoamScience/foam-language-server)

An implementation of the Language Server Protocol (LSP) for OpenFOAM dictionaries.
With symbol extraction features.

{{< /tab >}}

{{< tab "OpenFOAM Enhancements" >}}

#### <i class='fab fa-github'></i> Load-balanced adaptive mesh refinement
[STFS-TUDa/blastAMR](https://github.com/STFS-TUDa/blastAMR)

Load-balanced adaptive mesh refinement on polyhedral meshes on ESI OpenFOAM.
Ported from blastFOAM.

#### <i class='fab fa-github'></i> Bayesian optimization on OpenFOAM cases
[FoamScience/OpenFOAM-Multi-Objective-Optimization](https://github.com/FoamScience/OpenFOAM-Multi-Objective-Optimization)

Relying on ax-platform to experiment around 0-code parameter variation and
multi-objective optimization of OpenFOAM cases.

{{< /tab >}}

{{< tab "Presentations & courses" >}}

#### <i class='fab fa-web'></i> OpenFoam course on Parallel Programming
[https://openfoam-parallelisation-course.github.io](https://openfoam-parallelisation-course.github.io/)

#### <i class='fab fa-web'></i> Bayesian optimization on OpenFOAM cases
[Sandia's D Flame investigation with Bayesian optimization](https://foamscience.github.io/SandiaD-LTS-Bayesian-Optimization)

{{< /tab >}}

{{< tab "Experiments" >}}

#### <i class='fab fa-github'></i> OpenFOAM reflections
[FoamScience/openfoam-reflections](https://github.com/FoamScience/openfoam-reflections)

Provide an automated mechanism to build dictionary schemas for OpenFOAM classes. Because it pains
me to try to remember if a keyword is in effect or not after meddling with my libraries!!

#### <i class='fab fa-github'></i> Efficiency improvement with Views and template expressions
[FoamScience/LazyEvaluation-OpenFOAM-Exp](https://github.com/FoamScience/LazyEvaluation-OpenFOAM-Exp)

Investigating the viability of switching to lazy evaluation in OpenFOAM code instead of default eager evaluation.

#### <i class='fab fa-github'></i> (GPU) acceleration of OpenFOAM with OpenMP
[FoamScience/OpenMP-OpenFOAM-benchmarks](https://github.com/FoamScience/OpenMP-OpenFOAM-benchmarks)

Investigating the viability of implementing OpenMP acceleration, either with multi-threading on
the CPU, or with GPU offloading support in OpenMP 4.

{{< /tab >}}
{{< /tabs >}}
