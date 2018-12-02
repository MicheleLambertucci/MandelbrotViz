# Mandelbrot Set visualizer in WebGL
A mouse controllable [Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) visualization using WebGL.
Hosted [here](https://michelelambertucci.github.io/MandelbrotViz/) by Github Pages

#### Why the zooming in too much results in dropping resolution?
Sadly WebGL currently does not support double precision numbers, so number resolution is capped to float.