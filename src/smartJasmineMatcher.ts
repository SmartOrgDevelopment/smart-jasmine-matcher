module smartorg.test.matchers {

    interface Result {
        pass: boolean;
        message: string;
    }

    export let smartMatcher = {
        toEqual() {
            return {
                compare: function (actual: any, expected: any) {
                    let result: Result = {
                        pass: true,
                        message: ""
                    };
                    if (expected instanceof Array) {
                        compareArray(actual, expected, result);
                    } else if (expected instanceof Object) {
                        compareObject(actual, expected, result);
                    } else if (typeof expected === "string") {
                        // compareString(actual, expected, result);
                    } else if (typeof expected === "number") {
                        compareNumber(actual, expected, result);
                    }
                    return result;
                }
            }
        }
    };

    export function compareArray(actual: Array<any>, expected: Array<any>, result: Result) {
        for (var i = 0; i < expected.length; i++) {
            if (typeof actual[i] === "number") {
                compareNumber(actual[i], expected[i], result);
                if (!result.pass) {
                    result.message = "Item " + i + " had a mismatch.\n" + result.message;
                    break;
                }
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

    export function compareObject(actual: Array<any>, expected: Array<any>, result: Result) {
        for (var key in expected) {
            var expectedItem = expected[key];
            if (key in actual) {
                var actualItem = actual[key];
                if (typeof expectedItem === "string") {
                    compareString(actualItem, expectedItem, result);
                } else if (typeof expectedItem === "number") {
                    compareNumber(actualItem, expectedItem, result);
                } else {
                    // UNKNOWN TYPE!!!
                }
                if (!result.pass) {
                    result.message = "Mismatch in key '" + key + "':\n" + result.message;
                }
            } else {
                result.message = "Expected object has key '" + key + "' (value: " + expectedItem + ") which could not be found in the actual object."
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

    export function compareNumber(actual: number, expected: number, result: Result) {
        const DELTA = 0.0000001;
        let compareResult = Math.abs(expected - actual);

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

    export function compareString(actual: string, expected: string, result: Result) {

        for (var i = 0; i < expected.length; i++) {
            // if (expected.length === 0) {
            //     result.message = "Expected is undefined";
            //     result.pass = false;
            //     break;
            // }
            // if (actual.length === 0) {
            //     result.message = "Actual is undefined";
            //     result.pass = false;
            //     break;
            // }
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
            } else if (i === actual.length) {
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


}