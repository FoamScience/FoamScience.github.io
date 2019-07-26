---
layout: post
title:  "OpenSCAD Transformations & Boolean Operations"
description: "You'll learn how to efficiently use OpenSCAD's transformation and Boolean operation modules to create your STL geometries."
date:   2018-06-15 06:50:02
categories:
- openscad basics
tags: 
- openfoam
- openscad
- meshing
permalink: /openscad-transformations-boolean-operations/
image: /assets/img/OpenSCAD/openscad-transformations.jpg
ads: true
---

In my previous post, [OpenSCAD 101: Basics of the Programmers' CAD software](/openscad-basics/),
we've talked about the most important commands and OpenSCAD's language features.
This time, we'll discuss transformations (`translate`, `scale`, ... etc) and
introduce you to a new subject: Boolean operations on primitives.
<!--more-->


* OpenSCAD transformations & Boolean operations
{: toc}


## More on OpenSCAD's transformation modules

### Cascading transformations on a group of objects

A transformation is basically an operator module, so, it returns a new object,
which, naturally, can be transformed again. You are already familiar with this
concept, but, what if we wanted to perform two transformations on a group of
objects?

Well, grouping in OpenSCAD is usually performed with `{...}` (groups objects,
actions ... etc). The only requirement here is that you don't forget the tailing
semi-colon at the end of each object definition:

~~~cpp
m_axis = [0,0,1];
cent = [10,5,30];

mirror(m_axis) 
translate(cent){
   cube([10,20,20],center=true);
   translate([10,0,0]) sphere(5);
}
~~~

The `mirror` transformation mirrors the object on a plane through the origin.
`m_axis` is a normal vector to that plane. So, the previous snippet will:

1. Create a 10x20x20 cube at the origin.
2. Create a sphere of radius 5 at (10,0,0).
3. Translate each object by `cent` vector.
4. Mirror both resulting objects on the X-Y plane.

> This [[CheatSheet]](http://openscad.org/cheatsheet/) lists the available transformations
> and the [[user
> manual]](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#mirror)
> explains how to use them. 

### Scope of OpenSCAD variables

Continuing with our grouping thing: Remember when I told you not to mess with
variables in OpenSCAD? Well, you are now ready to do so:

1. OpenSCAD (starting from 2015.03 I think) is a scope-aware language, which
   means variables are defined locally in their scopes and can overwrite outer
   ones but only inside their scope.
2. A couple of braces `{...}` defines a new scope only if used with a module.

To illustrate, you can try out these few lines:

~~~cpp
// Global scope
vec = [10,5,0];
echo(vec);

translate(vec) {
    // Inner scope
    vec = 5;
    sphere(vec);
    echo(vec);
}

// Global scope is back
rotate(vec) cube(10);
~~~

The first `echo` will output the value of the vector `vec`; the second one will
say that `vec` is a floating point equal to 5, and the `rotate` command
will use the vector `vec` simply because it doesn't know about the other `vec`
(note that the `translate` command also doesn't know about it!).

Dummy scopes like this one:
~~~cpp
{ var = 10; } // is this a scope?

echo(var); /* ECHO: 10 
              No it's not! 
              If it was, ECHO should say 'undef' */
~~~
are not considered as valid scopes.

**A side note:**  
Numbers are represented as 64 bit IEEE floating points, and only decimal
notation is supported.
`nan` (NotANumber) is the only value that is not equal to any value (including
itself):
~~~cpp
x = 0/0;

// You can't say this:
// if (x == 0/0) echo "yes";
// Because nothing is equal to 0/0 including 0/0

// Alternatively, use this:
if (x != x) echo("yes");

// This also useful:
// Test to see if y is defined or not:
if (y == undef) echo("y is not defined yet");
~~~

## Boolean Operations with OpenSCAD

There are three basic Boolean operations you can perform on a group of objects
in OpenSCAD:

1. **Union (logical Or)**: Simply sums all child objects into a single one.
2. **Difference (logical and not)**: Subtracts all child objects starting from
   the second one from the first one.
3. **Intersection (logical and)**: Intersects all child objects.


They are all modules with no arguments, so:
~~~cpp
vec = [40, 0, 0];

union() {
    sphere(10);
    cube(20);
}

translate(vec) difference() {
sphere(10);
// Subtract all following objects from the sphere
cube(20);
}

translate(-vec) intersection() {
cube(20);
sphere(10);
}
~~~

The following image showcases the results of each module call:
!["OpenSCAD Boolean Operations"](/assets/img/OpenSCAD/openscad-boolean-operations.jpg)


Now let's do something interesting with what we have just learned:

~~~cpp
/*
   Create a module named specialCubes.
   It places a series of cubes on the perimeter of
   a circle (centered at the origin) where each
   cube is oriented towards the center of this circle.
   Parameters:
     - num: The number of cubes to place.
     - dist: circle radius (distance from origin). 
*/

module specialCubes(num, dist) {
// Approximate the size of each cube
// Remember, this var. is local to this module
size = (2* PI *dist/num)/sqrt(2);

/* Yes, PI is defined in the MCAD library
   Alongside TAU (2*PI) and mm_per_inch to convert
   inches to meters.
   Take a look at /usr/share/openscad/libraries/MCAD/constants.scad
*/
range = [0:360/num:360];
// ranges are of the form [start: step :end]

for (i=range)
rotate(i)
translate(dist*[1,0,0])
rotate(45)
cube(size, center=true);

}

// Subtract cubes as we create them from the first
// Cylinder.
difference(){
cylinder(r= 20, h=1, $fn=60,center=true);
specialCubes(30, 20);
specialCubes(20, 10);
cylinder(r= 2, h=5, $fn=30, center=true);
}
~~~

This will result in something similar to:

![OpenSCAD transformations and boolean ops](/assets/img/OpenSCAD/openscad-interesting-boolean.jpg)

>
> > Try to remove the `center=true` option from the first cylinder and
> > evaluate the results!
> 
> > If you are having trouble figuring out what happened here,  
> > rebuild the module from scratch without the for command.
>

Let's explain the `for` command though:
1. Create a cube at the origin of calculated size.
2. Rotate it 45 degrees so it's oriented towards the origin in its original state.
3. Translate it in the x-direction by `dist` units.
4. Rotate the resulting object by `i` degrees around the z-axis. 
5. These four steps are repeated for each `i` in the `range`.

Note that the last cylinder cannot have a height of '1', because 
the `difference` module will be confused when it finds the common
 surface (`h = 1.01` will work fine though).
