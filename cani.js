var CANI = {};
(function(exports) {
    var tests = [],
        testIdx = 0;

    /* exports */

    var register = exports.register = function(section, runFn) {
        tests.push({
            section: section,
            run: runFn
        });
    };

    var run = exports.run = function(callback) {

        var results = {},
            test;

        function runCurrentTest() {
            if (testIdx < tests.length) {
                test = tests[testIdx++];

                if (! results[test.section]) {
                    results[test.section] = {};
                } // if

                test.run(results[test.section], runCurrentTest);
            }
            else if (callback) {
                callback(results);
            } // if..else
        } // runCurrentTest

        testIdx = 0;
        runCurrentTest();
    }; // run

register('canvas', function(results, callback) {

    var testCanvas = document.createElement('canvas'),
        testContext = testCanvas.getContext('2d');

    /* define test functions */

    function checkPointInPath() {
        var transformed;

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

    results.pipTransformed = checkPointInPath();

    callback();
});
})(CANI);
