var CANI = {};
(function(exports) {
    var tests = [],
        testIdx = 0,
        publishedResults = false;

    /* exports */

    var register = exports.register = function(section, runFn) {
        tests.push({
            section: section,
            run: runFn
        });
    };

    var init = exports.init = function(callback) {

        var tmpResults = {};

        function runCurrentTest() {
            if (testIdx < tests.length) {
                var test = tests[testIdx++];

                if (! tmpResults[test.section]) {
                    tmpResults[test.section] = {};
                } // if

                test.run(tmpResults[test.section], runCurrentTest);
            }
            else {
                for (var section in tmpResults) {
                    exports[section] = tmpResults[section];
                } // for

                publishedResults = true;

                if (callback) {
                    callback(exports);
                } // if
            } // if..else
        } // runCurrentTest

        if (publishedResults && callback) {
            callback(exports);
        }
        else {
            testIdx = 0;
            runCurrentTest();
        } // if..else
    }; // run

register('canvas', function(results, callback) {

    var testCanvas = document.createElement('canvas'),
        isFlashCanvas = typeof FlashCanvas != 'undefined',
        isExplorerCanvas = typeof G_vmlCanvasManager != 'undefnined';

    /* define test functions */

    function checkPointInPath() {
        var transformed,
            testContext = testCanvas.getContext('2d');

        testContext.save();
        try {
            testContext.translate(50, 50);

            testContext.beginPath();
            testContext.rect(0, 0, 20, 20);

            transformed = testContext.isPointInPath(10, 10);
        }
        finally {
            testContext.restore();
        } // try..finally

        return transformed;
    } // checkPointInPath

    /* initialise and run the tests */

    testCanvas.width = 200;
    testCanvas.height = 200;

    results.pipTransformed = isFlashCanvas || isExplorerCanvas ? false : checkPointInPath();

    callback();
});
})(CANI);
