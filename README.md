# node-canvas-svg-test
Testing some SVG issues with node-canvas

Noticed some elliptical arc paths started breaking after upgrading node-canvas. This small test app
creates 2 PNG files from SVG strings. In version 2.0.0-alpha.18, both PNGs are rendered properly. However,
in 2.1.0 the first file does not draw the arc correctly. 

`git checkout 2.0.0-alpha.18`
`docker-compose up`

Open test-0.png and test-1.png, notice that both arcs are drawn correctly.

`git checkout 2.1.0`
`docker-compose up`

Open test-0.png and test-1.png, the first arc is not drawn while the second one, with an adjusted SVG string
is. 

It seems that the eY value in the arc path in the first SVG string `10.49000000166666` breaks the resulting
image. Both strings are valid SVGs.
