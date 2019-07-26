---
layout: post
title:  "OpenSCAD 101: Basics of the Programmers' CAD software"
description: "Want to design a parametric model using a CAD software? OpenSCAD is one of the best options: Easy to learn, great community and quality results!"
date:   2018-06-07 12:34:02
categories:
- openscad basics
tags: 
- openfoam
- openscad
- meshing
permalink: /openscad-basics/
image: /assets/img/OpenSCAD/openscad-basics.jpg
ads: true
---

When it comes to `creating a Mesh` for OpenFOAM, I always look for the most
**modular** way to do things:
<!--more-->

* If a great control over the mesh is required, **m4 macro language** and `blockMesh` 
are good choices. They are somewhat tiresome to use, but as long as they allow
me to do pretty much anything I can think of; I don't care!

* If I can live with little control over the mesh, (which is a more frequent case)
 I usually follow a 
**Model-it-with-CAD-then-cfMesh-it** approach; and there are two reasons:

1. If I'm to loose some control over the mesh anyway, why struggle with the *very-*long `snappyHexMeshDict`?
2. Parameterization of *cfMesh's* `meshDict` is much easier.


* openscad basics
{: toc}

This post is part of a longer series on how to make use of OpenSCAD
capabilities to perform CFD-like mesh generation. The typical workflow you are supposed
to follow can be summarized in these three key points:

1. Create a `parametric` OpenSCAD model for your problem's geometry.
2. Use `cfMesh` to generate quality meshes (which can also be parametric).
3. Simulate the case with OpenFOAM, change some design variables (Geometry, Mesh
   or Simulation properties) and go back to step `1` or `2` as needed. 

> DISCLAIMER:
>
> Every Code snippet in this post is a fully-functional OpenSCAD "script".  
> I strongly recommend you follow through by "trying" the commands!

{% include ad3.html %}

## Before we start ...

Before we dive into details of how to create parametric models in OpenSCAD, I
would like to introduce you to some important tips that you will find very
useful along the course of your learning process:

1. You can run OpenSCAD scripts here: [openscad.net](http://openscad.net) if
   you don't want to install it on your system.
2. OpenSCAD is written in **C++**, and it's a language by itself.
3. `Variables` in OpenSCAD are a bit *weird*: They are set at compile time rather
   than at "run" time (We'll talk about this later, you only need to know
   that you should never change the value of a variable after setting it).
4. Just like pretty much any other CAD software, you don't need to stick with
   the standard library: You can easily develop your own, and use others
   libraries.
5. Learning the basics of OpenSCAD shouldn't take longer than 15mins!
6. **OpenSCAD binaries** are available for a wide range of OSs but I'm focusing on
   Linux distros (Command-line usage ... etc).
7. You don't need to write code with the awful default *text editor* that comes
   with OpenSCAD: Use your own text editor instead (I'm using VIM with
   [VIM-OpenSCAD plugin](http://github.com/torrancew/vim-openscad)).

## Setting up OpenSCAD

On Ubuntu-based distros, installing OpenSCAD is as easy as executing the
command:

~~~bash
$ sudo apt install openscad
~~~

But this may install a relatively outdated version of the software (**Ubuntu
16.04 LTS** repos have the 2015.3 version, which is good for now). If you want
the latest release, follow the instructions provided in the 
[Official OpenSCAD Download page](http://www.openscad.org/downloads.html).

The default interface will combine a basic *text editor*, a *preview/render window*
(to preview the created models), and a *"log" console* (displays useful information).

I just can't stand the default text editor so I'm using **VIM** instead (you
can use your favorite text editor). You just have to make
sure that `Design >> Automatic Reload and Preview` option is turned on (in
OpenSCAD); This way, every time you save your *.scad* file, it gets reloaded and
models are automatically previewed.

Of course, VIM doesn't have native support for OpenSCAD's language, that's why I
needed to install a syntax-highlighting plugin first:
[Vim-OpenSCAD](http://github.com/torrancew/vim-openscad)

Also, you may need to create a directory to hold all your OpenSCAD projects 
(Store *all* of your OpenSCAD scripts in this directory) :
~~~bash
$ mkdir -p ~/OpenSCADProjs
~~~

> Just do it, OK! It eases dealing with library imports later!


## First steps: Learning the Syntax

OpenSCAD's language is actually very simple, and can be learned in no time; In
this section we'll try to break down the most interesting features of the
language (from a beginner's perspective of course).

### General syntax

- Every statement in an OpenSCAD "script" has to end with a semi-colon.
- A simple statement can create shapes, transform them, perform Boolean
  operations ... etc.
- Single-line comments are triggered with `//`, and multi-line ones are enclosed
  between `/*` and `*/` just like in other C-like languages.

### Variables in OpenSCAD

Variables in OpenSCAD are set during compile-time; Their behavior is different
from what you would expect. To illustrate this, let's take a simple example:

Suppose you have this Python script (Or the equivalent in any other well-known
language which implements some sort of mutable data approaches):

~~~python
# This is a comment
do_something_with(x) # Hey! x is not initialized!!

x = 1  # x variable will have a value of one
do_something_with(x) # Will do something with x = 1

x = 5  # Now x will have the value of 5
do_something_with(x) # Will do something with x = 5
~~~

In OpenSCAD, things are quite different:

~~~cpp
// This is a comment
do_something_with(x); // OK, this will do something with x = 5

x = 3;  // x will have the value of 3 for a moment
y = x+1; // y will have the value of 6

x = 5;  /* The final value of x, which is used in all other instructions */
~~~


See? Instead of treating the script line by line; OpenSCAD collects all variable
values first (If a variable is defined twice, the last value wins), then processes
the remaining instructions.

Variable assignment is very simple `varName = varValue;`, and you can use
arithmetic expressions in `varValue`.

As a general rule:
- Never change a variable's value with another instruction in your script;   
Create new variables instead. Think of these variables as immutable.

> You can also think of OpenSCAD's variables as C's constants; Don't mess with them
> unless you know what you are doing!

### OpenSCAD Vectors (Lists)

You can define vectors in the following way:

~~~cpp
a = 2;
b = 3;

// Vector creation
vec = [a,b];
// Display vector value in the console
echo(vec);

// Matrix creation, trivial
mat = [vec, vec+[2,4]];  // Some Vector operations are supported

// Access to elements:
echo(mat[1][0]);   /* Indexing follows C conventions */
~~~


Vectors are represented as simple lists; and some of their operations are 
supported by default (The '+' operator can handle both floats and vectors).

The `echo` command displays the value of the variable in the console (Look for
lines starting with `ECHO: ` in the few first lines of the log).

Indexing starts from '0', so `vec[0]` represents the value of `a` (Just like in
any other C-based language).

> Can you predict what the result of the last instruction in the previous
> snippet would be?

Beginners may be tempted to use ranges to define vectors, which is not quite
right!
~~~cpp
ran = [1:10];  // Range starting from 1, ending with 10 (step =1)
echo(ran);  // The range doesn't expand, huh !!

echo(ran[3]); /* Should output the 4th element in ran, Right?
                 Well, it gives "undef" instead !! */
~~~

Ranges are not vectors, they were created for usage with loops only!

Although, you can define a vector from a range in the following way:

~~~cpp
ran = [1:4];  // Range starting from 1, ending with 4 (step =1)
vec = [for (i = ran) i*2 ];  /* vec is a vector */
~~~

This will result in the following vector: `[2 4 6 8]`

### OpenSCAD functions


Functions in OpenSCAD are meant to take in some values, perform calculations and
return the results. The anatomy of a function looks like this:

~~~cpp
function funcName(arguments) = outputValue ;
~~~

The arguments are local and do not conflict with external variables.

Say I want to test wether or not some input variables `x,y` are
satisfying a certain constraint `x+y>=0`. This can be achieved using a function:

~~~cpp
// Define the function
// x, y are local to the function here
function testConst(x,y) = (x+y>=0) ? 1 : 0;

// Now how to call that function?

// You can't do this:
testConst(1,2);
// Because you'll get "Unknown module" error (Modules are something else)

// But you can definitely do this:
a = testConst(1,2);

// and
echo(testConst(1,2));
~~~

The expression `(x+y>=0) ? 1 : 0` is equivalent to:
~~~cpp
if (x+y is greater than or equal to 0) 
 {Give the value 1 to the function }
else  // if x+y is strict. less than 0
 {Give the value 0 to the function }
~~~

Of course, you can also define argument-less functions:

~~~cpp
/* Define a function named noArgsFunc that returns two random
numbers from the range (0,10).  */
function noArgsFunc() = rands(0,10,2);

// Call it
echo(noArgsFunc());
~~~

What if I want to call the function I'm defining inside itself? This is also
supported (called recursive functions). You only need to ensure the recursion
is terminated somehow:

~~~cpp
// There is no factorial function in standard library, so define one
function fact(n) = ( (n==1 || n==0) ? 1 : n*fact(n-1));
echo(fact(4));
~~~


Note that the definition of `fact` is basically a conditional statement where
the same function is called again if the condition is `false`:

1. Test if *n* is equal to 1 or 0; If it's the case, return the value of 1.
2. If not, multiply *n* by the factorial of *n-1*.
3. This process is recursively performed until `fact(1)` is reached; The recursion
   is then terminated by the conditional statement.


### The `include` "directive"

OpenSCAD uses two commands to include external OpenSCAD code into
the current model:

- `include <file.scad>` will act as if you copy-pasted the content of `file.scad` into your
  current file. It will evaluate all instructions in the imported library (including variable
  initialization ... etc).
- `use <file.scad>` will only include meta-code (function and module definitions) from 
  `file.scad`, but
  doesn't execute any other commands (No variable initialization, no shape creation ...
  etc)

## Basic OpenSCAD commands

Now that you've mastered the basics of OpenSCAD's usual-programming-language features,
let's get to the real deal:

### 2D and 3D shapes

Try this:

~~~cpp
circle(r=10);
/*
    r represents the radius of the circle.
    10 is the radius value, in mm by default.
    The circle is in X-Y plane by default.
    And it's center is at the origin.
    By default, The circle is "coarse" (low resolution).
*/
~~~

~~~cpp
// You can specify a diameter instead
circle(d=10);
~~~

~~~cpp
// And you can increase the resolution
circle(r=10, $fn=40);
/*
   $fn is the number of segments to draw a full circle
*/
~~~

The same applies to 3D shapes:
~~~cpp
sphere(10, $fn = 40); // if no "r=" or "d=", then it's a radius
cube([10,30,10], center=true);
/*
  [10,30,10] specifies [width,depth,height] (along [x,y,z])
  center= true | false specifies whether the cube should be
                       centered at the origin.
*/
~~~

There are few other pre-defined shapes which you can find here: 
[OpenSCAD CheatSheet](http://www.openscad.org/cheatsheet/)

### Transformations and Modules

Now that you've created some shapes, you'll want to do some operations on them;
That's exactly what modules are meant to do.

They can be used to define shapes, or even operators, which are then added to
the language (You can also import them from an external file).

An example of pre-defined module is the `translate` command:
~~~cpp
// This is not the definition of translate
// This demonstrates its usage.
translate([0,0,20]) sphere(10); 
/* Which translates the sphere in the z-direction by 20 mm */
~~~

This command is called an `object module`, ie. operates on primitives to define new
objects.

You can define an object module in the following way:

~~~cpp
module name ( parameters ) { actions }
~~~

for example, let's say I want to create an ellipsoid; Basically, I would write
something like this:

~~~cpp
scale([10,20,10]) sphere(1, $fn=30);
/* scale is a transformation module */
~~~

In a more modular way, I would define a special module which takes some vectors as
parameters and creates the ellipsoid for me:

~~~cpp
/*
    Define a module named ellipsoid
    Parameters:
     - dims: vector for dimensions, default value: [10,20,10]
     - center: coords of the center of the new object,
               defaults to the origin.
    What's between {...} is the actions to take.

    Read it like this:
    1. Create a sphere of radius = 1mm
    2. scale it in all directions according to the vector 'dims'
    3. translate the resulting object by the vector 'center'
*/
module ellipsoid(dims=[10,20,10], center=[0,0,0]) {
  translate(center) scale(dims) sphere(1, $fn=30); 
}

// Now call the module to create different objects:

// Ellipsoid with default values
ellipsoid();

// Change only the center
ellipsoid(center=[0,0,30]);

// Change all default parameters
ellipsoid(dims=[10,10,5],center=[0,40,0]);
~~~

> Note that you can omit the `;` at the end of a module's definition.

If you think about it carefully, this approach is useful only if you want to take a
specific "object" and do some operations on it in the sole purpose of creating
a new object (That's why it's called **object module**). What if you need to 
operate in the same way on a set of different objects?

To illustrate, assume we have a sphere, a cube and a square, and we want to
create a bunch of duplicates of each object in a specified direction. Indeed, we
would need an "operator module", a module that doesn't care about objects but
only cares about what operations to perform on them. For this, we'll need a new 
concept (`children` of a module):

~~~cpp
/*
   Create a module named duplicate.
   Parameters:
     - num: The number of duplicates (original object included).
     - space: The space between two consecutive objects.
     - dir: normalized direction vector, defaults to the x-direction.
   This will take the first object in the children, and translate it by the 
   required amount each time (in the for loop)
*/
module duplicate(num, space, dir=[1,0,0]) {
// Starting the range with 0 will preserve the original object
    for (i = [0:num-1]) translate(dir*space*i) children(0);
// Uses only the first element of "children"
}

// Five duplicates of a sphere in the x (default) direction
duplicate(num=5, space=20) sphere(5);

// Five duplicates of a cube in z-direction
duplicate(5,20,[0,0,1]) translate([0,0,30]) cube(10,center=true);

// Five duplicates of a square in a custom 
// (but vector-normalized) direction
duplicate(5,20,[0,sqrt(2)/2,sqrt(2)/2]) translate([0,20,0])
                               cube([20,10,1],center=true);
~~~

> OpenSCAD doesn't support STL export of mixed 2D and 3D shapes;  
> So, We have to create square-like cubes!!

The `for (i = range) action;` loop will perform the action while varying `i`
in the `range`. The action here is to take the first shape in the `children`
list and translate it by the vector (`dir*space*i`).

{% include ad2.html %}

The previous script results in something like this:

![OpenSCAD duplicates Module](/assets/img/OpenSCAD/openscad-duplicate.jpg)

(The Blue sphere is at the origin; Hopefully you can tell where everything is!!).

> Hey! you are no longer a "beginner"!! You can create modules and use
> functions!!!

### Modifiers

> This not quite necessary to learn now, but it will become handy in the following
> tutorial.


You can use modifiers to control the way objects are displayed 
in OpenSCAD's preview window:

~~~cpp
// Transparent cube 
%translate([10,0,0]) cube(10);
// Highlight a sphere
#sphere(10);

// Another way:
color("blue",0.8) translate([0,0,10]) cube(10);
/* 0.8 controls transparency (alpha) */
~~~ 

That's it for today, I bet you already learned more tricks just by looking at
[OpenSCAD's Cheatsheet](http://www.openscad.org/cheatsheet/).

