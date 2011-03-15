register('canvas', function(results, callback) {

    // initialise variables
    var testCanvas = document.createElement('canvas'),
        isFlashCanvas = typeof FlashCanvas != 'undefined',
        isExplorerCanvas = typeof G_vmlCanvasManager != 'undefnined';
    
    /* define test functions */
    
    function checkPointInPath() {
        var transformed,
            testContext = testCanvas.getContext('2d');
        
        testContext.save();
        try {
            // translate the context 
            // webkit uses the untranslated position, whereas MOZ, opera uses translated
            testContext.translate(50, 50);

            // create a rect path 20x20 at the new origin (actually 50, 50)
            testContext.beginPath();
            testContext.rect(0, 0, 20, 20);
            
            // now check to see if the point is in the path at 10, 10
            transformed = testContext.isPointInPath(10, 10);
        }
        finally {
            testContext.restore();
        } // try..finally
        
        return transformed;
    } // checkPointInPath
    
    /* initialise and run the tests */

    // initialise the test canvas width and height
    testCanvas.width = 200;
    testCanvas.height = 200;
    
    // check the point in path tranforms
    results.pipTransformed = isFlashCanvas || isExplorerCanvas ? false : checkPointInPath();
    
    // trigger the callback
    callback();
});