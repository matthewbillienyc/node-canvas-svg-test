# node-canvas-svg-test
Testing some SVG issues with node-canvas

Noticed some elliptical arc paths started breaking after upgrading node-canvas. This small test app
creates 2 PNG files from svg strings. In version 2.0.0-alpha.5, both PNGs are rendered properly. However,
in 2.3.1 the first file does not draw the arc correctly. 

`git checkout 2.0.0-alpha.5`
`docker-compose up`
 