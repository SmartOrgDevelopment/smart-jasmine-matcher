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
                                result = compareArray(actual, expected);
                            }
                            else if (expected instanceof Object) {
                                result = compareObject(actual, expected);
                            }
                            else if (typeof expected === "string") {
                                result = compareString(actual, expected);
                            }
                            else if (typeof expected === "number") {
                                result = compareNumber(actual, expected);
                            }
                            else if (typeof expected === "undefined") {
                                result = compareUndefined(actual, expected);
                            }
                            return result;
                        }
                    };
                }
            };
            function compareArray(actual, expected) {
                var result = { pass: true, message: "" };
                if (actual === undefined) {
                    fail(result, "Actual object was undefined, while Expected was: " + JSON.stringify(expected));
                    return result;
                }
                for (var i = 0; i < expected.length; i++) {
                    var expectedItem = expected[i];
                    var actualItem = actual[i];
                    var testResult = { pass: true, message: "" };
                    if (typeof expectedItem === "string" && typeof actualItem === "string") {
                        testResult = compareString(actualItem, expectedItem);
                    }
                    else if (typeof expectedItem === "number" && typeof actualItem === "number") {
                        testResult = compareNumber(actualItem, expectedItem);
                    }
                    else if (expectedItem instanceof Array) {
                        testResult = compareArray(actualItem, expectedItem);
                    }
                    else if (expectedItem instanceof Object && actualItem instanceof Object) {
                        testResult = compareObject(actualItem, expectedItem);
                    }
                    else if (typeof expectedItem === "undefined") {
                        testResult = compareUndefined(actualItem, expectedItem);
                    }
                    if (!testResult.pass) {
                        fail(result, "Item " + i + " had a mismatch.\n" + tab(testResult.message) + "\n");
                    }
                }
                if (actual.length != expected.length) {
                    result.pass = false;
                    result.message =
                        "Expected array has " + expected.length +
                            " items while actual array has " + actual.length + "\n" +
                            result.message;
                }
                return result;
            }
            matchers.compareArray = compareArray;
            function tab(someString) {
                var lines = someString.split("\n");
                var tabbedLines = lines.map(function (line) { return "\t" + line; });
                return tabbedLines.join("\n");
            }
            matchers.tab = tab;
            function checkExtraKeysInActual(actual, expected, result) {
                var keysInActualNotInExpected = Object.keys(actual).filter(function (key) {
                    return !(key in expected);
                });
                if (keysInActualNotInExpected.length > 0) {
                    result.pass = false;
                    keysInActualNotInExpected.forEach(function (key) {
                        result.message += "Actual object has extra key {" + key + ": " + actual[key] + "} which was not in the expected object.\n";
                    });
                }
            }
            function fail(result, message) {
                result.message += message;
                result.pass = false;
            }
            matchers.fail = fail;
            function compareObject(actual, expected) {
                var result = { pass: true, message: "" };
                if (actual === undefined) {
                    fail(result, "Actual object was undefined, while Expected was: " + JSON.stringify(expected));
                    return result;
                }
                for (var key in expected) {
                    var expectedItem = expected[key];
                    if (key in actual) {
                        var actualItem = actual[key];
                        var testResult = { pass: true, message: "" };
                        if (typeof expectedItem === "string") {
                            testResult = compareString(actualItem, expectedItem);
                        }
                        else if (typeof expectedItem === "number") {
                            testResult = compareNumber(actualItem, expectedItem);
                        }
                        else if (typeof expectedItem === "undefined") {
                            testResult = compareUndefined(actualItem, expectedItem);
                        }
                        else if (expectedItem instanceof Array) {
                            testResult = compareArray(actualItem, expectedItem);
                        }
                        else if (expectedItem instanceof Object) {
                            testResult = compareObject(actualItem, expectedItem);
                        }
                        if (!testResult.pass) {
                            fail(result, "Mismatch in key '" + key + "':\n" + tab(testResult.message) + "\n");
                        }
                    }
                    else {
                        fail(result, "Expected object has extra key {" + key + ": " + expectedItem + "} which could not be found in the actual object.\n");
                    }
                }
                checkExtraKeysInActual(actual, expected, result);
                return result;
            }
            matchers.compareObject = compareObject;
            function compareNumber(actual, expected) {
                var testResult = { pass: true, message: "" };
                var DELTA = 0.0000001;
                var compareResult = Math.abs(expected - actual);
                // When key does not exist
                if (isNaN(compareResult)) {
                    testResult.pass = false;
                }
                // Value does not match
                if (compareResult > DELTA) {
                    testResult.pass = false;
                }
                if (!testResult.pass) {
                    testResult.pass = false;
                    testResult.message = "Expected " + actual + " to be " + expected;
                }
                return testResult;
            }
            matchers.compareNumber = compareNumber;
            function compareString(actual, expected) {
                var testResult = { pass: true, message: "" };
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
                        testResult.pass = false;
                        var errorMessage = "Mismatch in character " + i + " when "
                            + preview + "\n<===EXPECTED " + expected + " ==> with <===ACTUAL "
                            + actual + " ==>\n";
                        break;
                    }
                    else if (i === actual.length) {
                        testResult.pass = false;
                        errorMessage = "Expected string " + expected + " has more " +
                            "characters than actual string " + actual;
                        break;
                    }
                }
                if (actual.length > expected.length && !errorMessage) {
                    testResult.pass = false;
                    errorMessage = "Expected string " + expected + " has fewer " +
                        "characters than actual string " + actual;
                }
                if (!testResult.pass) {
                    testResult.pass = false;
                    testResult.message = errorMessage;
                }
                return testResult;
            }
            matchers.compareString = compareString;
            function compareUndefined(actual, expected) {
                var testResult = { pass: true, message: "" };
                if (actual) {
                    testResult.pass = false;
                    testResult.message = "Expected undefined but got " + JSON.stringify(actual);
                }
                return testResult;
            }
            matchers.compareUndefined = compareUndefined;
        })(matchers = test.matchers || (test.matchers = {}));
    })(test = smartorg.test || (smartorg.test = {}));
})(smartorg || (smartorg = {}));
