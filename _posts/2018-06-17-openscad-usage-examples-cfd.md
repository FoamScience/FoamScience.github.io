---
layout: post
title:  "OpenSCAD CFD-oriented Usage Examples"
description: "This post provides a bunch of very basic OpenSCAD modules which can be extended or used to model more complicated models."
date:   2018-06-17 07:45:13
categories: 
- openscad basics
tags: 
- openfoam
- openscad
- meshing
permalink: /openscad-cfd-usage-examples/
image: /assets/img/OpenSCAD/openscad-examples.jpg
ads: true
---

We've been learning the basics of OpenSCAD language:
* [OpenSCAD 101: Basics of the OpenSCAD language](/openscad-basics/)
* [OpenSCAD Transformations & Boolean Ops](/openscad-transformations-boolean-operations/)

In this post, I'll teach you how to build commonly used shapes using new tricks:
You probably can create them already, but I want to show you the power of
2D-shapes Extrusion in OpenSCAD.

{% include ad1.html %}


* OpenSCAD CFD usage examples
{: toc}


> One of the most important lessons I learned while working with OpenSCAD is
> that I
> absolutely have to keep my models "parametric" no matter what!

## A parametric T-junction module.

First, let's learn how to manipulate module parameters (arguments) efficiently:

1. You already know that you can specify a default value for a parameter.
2. `cylinder(r=1,h=2)` and `cylinder(r1=1, r2=2, h=5)` both work fine because
   the cylinder module is set up in a way that if only one radius is supplied,
   it's considered as "cylinder radius"; but if two are supplied, the module
   produces a cone like shape.
3. At the moment, OpenSCAD doesn't support setting a module's parameter value as the
   default value of another one, i.e. the command `module dum(p1,p2=p1) {echo(p2);}` 
   will result in a warning: "Ignoring unknown variable p1", and the `echo` command
   will say that `p2` is `undef`.

The following example shows a way of dealing with such situations where we want
to use a second radius only if the user says so.

The T-Junction shape I have in mind is illustrated in the following image 
(Well, this is actually the resulting one ...):

<picture> 
<source srcset="/assets/img/OpenSCAD/openscad-tjunction.webp" type="image/webp"> 
<img src="/assets/img/OpenSCAD/openscad-tjunction.jpg" alt="OpenSCAD T-Junction Model">
</picture>

> If you have any question, don't hesitate, fire at me in the comments section.

{% highlight C %}
/*
    Create an object module called tJunction.
    Parameters:
    - mr1: Main cylinder radius in mm
    - mh:  Main cylinder height in mm
    - ar1: Additional cylinder radius in mm
    - ah:  Additional cylinder height in mm
    [Optional parameters, for cone-like shapes]
    - mr2: Second main cylinder radius in mm 
    - ar2: Second additional cylinder radius in mm 

    This module creates a T-shaped pipe (pointing up in z-direction).
*/
module tJunction(mr1,mh,ar1,ah, mr2,ar2) {

    // First check that the main cylinder is wider
    if (mr1<ar1){ 
       // ECHO knows HTML 
       // Use checkMesh-like indicators (***) for auto error finding
        echo("<font color='red'>*** Check cylinders dimensions</font>");
    }   
    
    // If optional parameters are not defined,
    // Use only the main ones.
    mr2 = (mr2 == undef) ? mr1: mr2;
    ar2 = (ar2 == undef) ? ar1: ar2;

    // Build the actual thing
    union(){
        rotate([0,90,0]) cylinder(r1=mr1,r2=mr2,h=mh, center=true);
        cylinder(r1=ar1, r2=ar2, h=ah);
    }   
}

// An example
tJunction(10,100,5,50, $fn=60);
/* translate(-[100,0,0]) tJunction(12,100,5,50,5,3, $fn=60); */

{% endhighlight %}


## A parametric U-like pipe [For OpenSCAD 2016+]

There are generally two ways to create 3D shapes out of 2D ones with OpenSCAD:

* **Linear Extrusion:** Extruding a 2D shape in a single direction
  (Specifically, in the z-direction), but the shape can be twisted!
* **Rotating Extrusion:** Rotating a 2D shape around the Z-axis to create a
  symmetric shape (Rotational symmetry).

... And there is a command for each method: `linear_extrude` and `rotate_extrude`.

Let's see what parameters we need to specify in order to build a U-shaped pipe:
<picture> 
<source srcset="/assets/img/OpenSCAD/openscad-ushape.webp" type="image/webp"> 
<img src="/assets/img/OpenSCAD/openscad-ushape.jpg" alt="OpenSCAD UShaped pipe">
</picture>

{% highlight C %}
/*
    Create an object module named Ushape.
    Parameters:
    - ur1: Pipe radius.
    - ur2: 2*ur2 is the center-to-center distance between 
           the extensions of U shape.
    - uh: length of these extensions.
    Requires OpenSCAD 2016.xx or newer because:
    ** It uses the angle argument **
    
    Makes use of standard extrusions to build
    a U-shaped pipe.
*/
module Ushape(ur1, ur2 ,uh) {

    // Circle resolution
    cRes = 30;
    // Extrusion resolution
    eRes = 50;

    union(){
        // The rounded part
        rotate_extrude(angle=180, convexity=10, $fn=eRes)
               translate([ur2, 0]) circle(ur1, $fn=cRes);

        // U extensions
        rotate([90,0,0]) linear_extrude(height=uh,$fn=eRes)
               translate([ur2, 0]) circle(ur1, $fn=cRes);
        rotate([90,0,0]) linear_extrude(height=uh,$fn=eRes)
               translate([-ur2, 0]) circle(ur1, $fn=cRes);
    }

}

// Simple example usage:
// Ushape(2,10,20);

// Hollow U-shape
difference(){
Ushape(2,10,20);
Ushape(1,10,20.01);
}
{% endhighlight %}

> It's important that you learn more about these extrusion commands from the
> [[User
> Manual]](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/2D_to_3D_Extrusion#Rotate_Extrude)

## A parametric U-like pipe [For older OpenSCAD]

{% highlight C %}
/*
    Create an object module named Ushape.
    Parameters:
    - ur1: Pipe radius.
    - ur2: 2*ur2 is the center-to-center distance between 
           the extensions of U shape.
    - uh: length of these extensions.
    Works with all OpenSCAD versions:
    Instead of using the new "angle" argument,
    use an intersection to get the same effect.
    Makes use of standard extrusions to build
    a U-shaped pipe.
*/
module Ushape(ur1, ur2 ,uh) {

    // Circle resolution
    cRes = 30;
    // Extrusion resolution
    eRes = 50;

    union(){
    // The rounded part
        intersection(){ // Intersect the extruded circle with a cube
        rotate_extrude(convexity=10, $fn=eRes)
               translate([ur2, 0]) circle(ur1, $fn=cRes);
        # translate([0,(ur2+ur1),0])
            cube([2*(ur2+ur1),2*(ur2+ur1),2*ur1],center=true);
        }
        // U extensions
        rotate([90,0,0]) linear_extrude(height=uh,$fn=eRes)
               translate([ur2, 0]) circle(ur1, $fn=cRes);
        rotate([90,0,0]) linear_extrude(height=uh,$fn=eRes)
               translate([-ur2, 0]) circle(ur1, $fn=cRes);
    }

}
{% endhighlight %}


> Don't forget to remove the highlighter (#) from the cube command.

## An Even Better Ushape module

Why limiting ourselves to circles? Indeed, there is no reason, so, we can
upgrade our previous model to take in any 2D shape (hopefully) and use it when
creating the U shape. 

The transition is simple:
* Remove instructions and variables (Resolution and Radius variables) that
  are related to the base circle in old module.
* Replace every instance of the circle with `children(0)` (The first item in the
  children list).

{% highlight C %}
/*
    Create an operator module named Ushape.
    Parameters:
    - ur: 2*ur is the center-to-center distance between 
           the extensions of U shape.
    - uh: length of these extensions.
    Children:
    - Use only one child object
    Requires OpenSCAD 2016.xx or newer because:
    ** It uses the angle argument **
    
    Makes use of standard extrusions to build
    a U-shaped pipe.
*/
module Ushape(ur ,uh) {

    // Extrusion resolution
    eRes = 50; 

    union(){
        // The rounded part
        rotate_extrude(angle=180, convexity=10, $fn=eRes)
               translate([ur, 0]) children(0); 

        // U extensions
        rotate([90,0,0]) linear_extrude(height=uh,$fn=eRes)
               translate([ur, 0]) children(0);
        rotate([90,0,0]) linear_extrude(height=uh,$fn=eRes)
               translate([-ur, 0]) children(0);
    }   

}

// Hollow U-shape
difference(){
    Ushape(10,20) {scale([1,.7]) circle(4, $fn=30);};
    Ushape(10,20.01) {circle(2,$fn=30);};
}

{% endhighlight %}

{% include ad2.html %}

The previous example should produce something like this:

<picture>
<source srcset="/assets/img/OpenSCAD/openscad-operator-ushape.webp" type="image/webp"> 
<img src="/assets/img/OpenSCAD/openscad-operator-ushape.jpg" alt="OpenSCAD operator module Ushape">
</picture>

>
> > Note: These modules produce a medium-quality STLs (in terms of Triangle
> > Quality), but this can be easily improved if you are in dire need of quality
> > triangles.
>
> > You can check these models using OpenFOAM's `surfaceCheck` utility after
> > exporting them to STL files.
>

## A Bottle of water

### A simple model

Extrusion commands are best used with `polygons`; This example illustrate how
simple it is to model a bottle of water in OpenSCAD. Of course, the approach
used here is my own way of dealing with simple problems efficiently; For more
complicated shapes, I'll show you another way to make the most of `rotate_extrude`.

First, we have to get a simple blueprint for a bottle of water. 

[This picture](https://us.123rf.com/450wm/maralingstad/maralingstad1509/maralingstad150901356/45434655-vector-blueprint-water-bottle-on-engineer-or-architect-background-.jpg) is good enough.

I usually use [WepPlotDigitizer](https://automeris.io/WebPlotDigitizer) 
   to extract the coordinates of the most important points in the shape:


In this case, I chose the center of the main circle as an origin of
coordinates system (Both axes are chosen to match the featured "diameters").

In the following picture: 
* `X1` and `Y1` are at the origin.
* `X2= (1,0)`
* `Y2= (0,3)`

<picture class="image-center"> 
<source srcset="/assets/img/OpenSCAD/openscad-bottle-coords.webp" type="image/webp"> 
<img src="/assets/img/OpenSCAD/openscad-bottle-coords.png" alt="OpenSCAD bottle coords"
class="image-center">
</picture>

Next we mark some points on one half of the bottle (so we can rotate it later):

* The order of these points is actually not important because the `polygon`
  command in OpenSCAD has a `paths` option to specify the correct order of
  linked points, but this is extra work; Thus, make sure you create a manifold
  polygon while selecting these points.

<picture class="image-center">
<source srcset="/assets/img/OpenSCAD/openscad-bottle-points.webp" type="image/webp">
<img src="/assets/img/OpenSCAD/openscad-bottle-points.png" alt="WebPlotDigitizer bottle"
class="image-center">
</picture>

Point coordinates can be viewed by Pressing `View Data` under the `Dataset` tab in
`WebPlotDigitizer`:

<picture class="image-center"> 
<source srcset="/assets/img/OpenSCAD/openscad-bottle-data.webp" type="image/webp"> 
<img src="/assets/img/OpenSCAD/openscad-bottle-data.png" alt="WebPlotDigitizer bottle" 
class="image-center"> 
</picture>

Finally, creating the actual bottle model is as easy as executing the command:
{% highlight C %}
// Create points vector
pnts = [ [0.000, -3.458],
         [1.033, -3.458],
         [1.100, -3.395],
         [1.100, -0.553],
         [0.433, 2.842],
         [0.367, 2.905],
         [0.300, 3.000],
         [0.000, 3.000] ];
// Create the polygon and rotate it.
rotate_extrude(convexity=4) polygon(pnts*10);
{% endhighlight %}

> > Note that we can omit point's z-coordinate if it's `0`.
>
> > Using a decent text editor is crucial here: In VIM, 
> > you can create the `pnts` vector with only one command
> > (applied to the text in previous figure).
> > `:1,8 g/^/ exe "norm! A],\<Esc>I["`  
> > Done! Now you only have to delete the last `,`
> > * `1` is the first line's number, and `8` is the last one.
> > * If you want to know more, ask in the comments.

This should result in the following model:

<picture> 
<source srcset="/assets/img/OpenSCAD/openscad-bottle-water.webp" type="image/webp"> 
<img src="/assets/img/OpenSCAD/openscad-bottle-water.jpg" alt="OpenSCAD Bottle Model">
</picture>

### A more complicated model

If you want an exact match to your sketch, you can follow the following approach:
1. Create an SVG-path file using `GIMP` and `LibreCAD` for your model.
2. Convert the SVG file to DXF using `inkscape` and `pstoedit`.
4. Get it into OpenSCAD and use `rotate_extrude` on it.

An example SVG file for a sample bottle of water can be found
[here](/assets/img/OpenSCAD/openscad-path-bottle.svg)

It looks like this:

<picture class="image-center">
<source srcset="/assets/img/OpenSCAD/openscad-path-bottle.webp" type="image/webp"> 
<img src="/assets/img/OpenSCAD/openscad-path-bottle.png" alt="OpenSCAD SVG path">
</picture>

Now, let's convert this SVG file to an OpenSCAD-compatible DXF:
{% highlight bash %}
$ inkscape -E intermediate.eps openscad-path-bottle.svg
$ pstoedit -dt -f dxf:-polyaslines\ -mm intermediate.eps openscad-path-bottle.dxf
{% endhighlight %}

- The first command uses `inkscape` to convert the SVG file to the EPS format.
- The second one uses `pstoedit` to convert the resulting EPS file to a DXF
  file.

> Note that the `-polyaslines` option is very important as OpenSCAD doesn't
> support curved lines in DXF files. 

To use `openscad-path-bottle.dxf` put it in the same directory as the following
script (2D shape highlighted):

{% highlight C %}
// Easy as eveything else in OpenSCAD
rotate_extrude(convexity=4)
#import("openscad-path-bottle.dxf");
{% endhighlight %}

Which will result in the following shape:

<picture> 
<source srcset="/assets/img/OpenSCAD/openscad-bottle-svg.png" type="image/png"> 
<img src="/assets/img/OpenSCAD/openscad-bottle-svg.png" alt="OpenSCAD STL bottle">
</picture>

Hey, why don't you try this for fun (Try it multiple times):
{% highlight C %}
function polyR(l=1) =[
    for (i=[0:20:180])
    [rands(0,l,1)[0]*cos(90-i), rands(0,l,1)[0]*sin(90-i)]
];

v = polyR();
rotate_extrude(convexity=10) scale(15) polygon(v);
{% endhighlight %}


## Exporting models to STL format

To export your geometry models to STL files, you can either:
* Use the GUI: `File > Export > Export as STL ...` after rendering the model (with `F6`).
* Or, from the command line:
{% highlight bash %}
$ openscad file.scad -o file.stl
{% endhighlight %}

By default, OpenSCAD exports everything as a single region (named
`OpenSCAD_Model`) to an ASCII STL file. You'll learn how to improve this
behavior in the next posts.

> All the models described here are fairly simple and OpenFOAM's `autoPatch` can
> handle separating mesh boundary patches later efficiently!

{% include ad3.html %}

That's all for today, I hope this was a useful post; see you in the next one!
