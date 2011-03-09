var CANI = {};
(function(exports) {
    // initialise internals
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

                // if a results container for the test has not been created, create one
                if (! tmpResults[test.section]) {
                    tmpResults[test.section] = {};
                } // if
                
                // run the test
                test.run(tmpResults[test.section], runCurrentTest);
            }
            else {
                // iterate through each of the elements of the results and export them
                for (var section in tmpResults) {
                    exports[section] = tmpResults[section];
                } // for

                // flag the results as published
                publishedResults = true;
                
                // fire the callback
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
    
    //= require "tests/canvas"
})(CANI);