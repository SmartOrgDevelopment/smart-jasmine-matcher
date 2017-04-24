var smartorg;
(function (smartorg) {
    var test;
    (function (test) {
        var matchers;
        (function (matchers) {
            matchers.smartMatcher = {
                toEqual: function () {
                    return {
                        compare: function (actual, expected) {
                            var result = {
                                pass: true,
                                message: ""
                            };
                            if (expected instanceof Array) {
                                compareArray(actual, expected, result);
                            }
                            else if (expected instanceof Object) {
                                compareObject(actual, expected, result);
                            }
                            else if (typeof expected === "string") {
                                compareString(actual, expected, result);
                            }
                            else if (typeof expected === "number") {
                                compareNumber(actual, expected, result);
                            }
                            else if (typeof expected === "undefined") {
                                compareUndefined(actual, expected, result);
                            }
                            return result;
                        }
                    };
                }
            };
            function compareArray(actual, expected, result) {
                for (var i = 0; i < expected.length; i++) {
                    var expectedItem = expected[i];
                    var actualItem = actual[i];
                    if (typeof expectedItem === "string" && typeof actualItem === "string") {
                        compareString(actualItem, expectedItem, result);
                    }
                    else if (typeof expectedItem === "number" && typeof actualItem === "number") {
                        compareNumber(actual[i], expected[i], result);
                        if (!result.pass) {
                            result.message = "Item " + i + " had a mismatch.\n" + result.message;
                            break;
                        }
                    }
                    else if (expectedItem instanceof Object && actualItem instanceof Object) {
                        compareObject(actualItem, expectedItem, result);
                    }
                    else if (typeof expectedItem === "undefined") {
                        compareUndefined(actualItem, expectedItem, result);
                    }
                }
                if (actual.length != expected.length) {
                    result.pass = false;
                    result.message =
                        "Expected array has " + expected.length +
                            " items while actual array has " + actual.length + "\n" +
                            result.message;
                }
            }
            matchers.compareArray = compareArray;
            function compareObject(actual, expected, result) {
                for (var key in expected) {
                    var expectedItem = expected[key];
                    if (key in actual) {
                        var actualItem = actual[key];
                        if (typeof expectedItem === "string") {
                            compareString(actualItem, expectedItem, result);
                        }
                        else if (typeof expectedItem === "number") {
                            compareNumber(actualItem, expectedItem, result);
                        }
                        else if (typeof expectedItem === "undefined") {
                            compareUndefined(actualItem, expectedItem, result);
                        }
                        if (!result.pass) {
                            result.message = "Mismatch in key '" + key + "':\n" + result.message;
                        }
                    }
                    else {
                        result.message = "Expected object has key '" + key + "' (value: " + expectedItem + ") which could not be found in the actual object.";
                    }
                }
                if (actual.length != expected.length) {
                    result.pass = false;
                    result.message =
                        "Expected array has " + expected.length +
                            " items while actual array has " + actual.length + "\n" +
                            result.message;
                }
            }
            matchers.compareObject = compareObject;
            function compareNumber(actual, expected, result) {
                var DELTA = 0.0000001;
                var compareResult = Math.abs(expected - actual);
                // When key does not exist
                if (isNaN(compareResult)) {
                    result.pass = false;
                }
                // Value does not match
                if (compareResult > DELTA) {
                    result.pass = false;
                }
                if (!result.pass) {
                    result.pass = false;
                    result.message = result.message + "Expected " + actual + " to be " + expected;
                }
            }
            matchers.compareNumber = compareNumber;
            function compareString(actual, expected, result) {
                for (var i = 0; i < expected.length; i++) {
                    if (!expected) {
                        expected = "";
                    }
                    if (!actual) {
                        actual = "";
                    }
                    if (i < actual.length && expected[i] !== actual[i]) {
                        var backChars = Math.min(20, i);
                        var forwardCharsExp = Math.min(20, expected.length - i);
                        var forwardChartsAct = Math.min(20, actual.length - i);
                        var expectedSome = expected.substring(i - backChars, i + forwardCharsExp);
                        var cursor = Array(backChars + 1).join(" ") + "^";
                        var actualSome = actual.substring(i - backChars, i + forwardChartsAct);
                        var preview = "Comparing\n" + expectedSome + "\n" + cursor
                            + "\nwith\n" + actualSome + "\n" + cursor;
                        result.pass = false;
                        var errorMessage = "Mismatch in character " + i + " when "
                            + preview + "\n<===EXPECTED " + expected + " ==> with <===ACTUAL "
                            + actual + " ==>\n";
                        break;
                    }
                    else if (i === actual.length) {
                        result.pass = false;
                        errorMessage = "Expected string " + expected + " has more " +
                            "characters than actual string " + actual;
                        break;
                    }
                }
                if (actual.length > expected.length && !errorMessage) {
                    result.pass = false;
                    errorMessage = "Expected string " + expected + " has fewer " +
                        "characters than actual string " + actual;
                }
                if (!result.pass) {
                    result.pass = false;
                    result.message = errorMessage + result.message;
                }
            }
            matchers.compareString = compareString;
            function compareUndefined(actual, expected, result) {
                if (actual) {
                    result.pass = false;
                    result.message = result.message + "Expected undefined but got " + actual;
                }
            }
            matchers.compareUndefined = compareUndefined;
        })(matchers = test.matchers || (test.matchers = {}));
    })(test = smartorg.test || (smartorg.test = {}));
})(smartorg || (smartorg = {}));
