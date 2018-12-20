# Mandelbrot Set visualizer with WebGL
A mouse controllable [Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) visualization using WebGL.
Hosted [here](https://michelelambertucci.github.io/MandelbrotViz/) by Github Pages

#### Why the resolution drops when I zoom in too much?
Sadly WebGL currently does not support double precision numbers, so number resolution is capped to float.
