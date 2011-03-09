# CANI (Can I?)

This library has started purely as a feature level detection utility (in the vein of Modernizr) but targeted primarily at building interactive applications using HTML5 canvas (and friends).

This is not meant to be a replacement for Modernizr but rather a suite of runtime checks that can assist you in working with canvas and others across browsers. At the moment it has very few tests, but over time it is expected to grow.

## Usage

Using CANI is simple. At the appropriate time (once the DOM has been initialized), simply call the following:

	CANI.test(function(results) {
		
	});
	
On the first call of this function the registered tests will be run and the results transposed into the global `CANI` object.  The results are additionally passed back through the callback.

## Canvas Tests

### isPointInPath

`CANI.canvas.pipTransformed`

The current working spec for canvas lists the [inPointInPath](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-ispointinpath) function as returning true when:

> the point given by the x and y coordinates passed to the method, when treated as coordinates in the canvas coordinate space unaffected by the current transformation.

Unfortunately, this is not consistent across browsers.  As such you will need to determine whether you use an position that is unaffected by transforms (translate, scale, rotate) or simply the position of the cursor relative to the canvas.