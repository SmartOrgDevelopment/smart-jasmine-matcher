module smartorg.test.matchers {

    interface Result {
        pass: boolean;
        message: string;
    }

    export let smartMatcher = {
        toEqual() {
            return {
                compare: function (actual: any, expected: any) {
                    return compareByType(expected, actual);
                }
            }
        }
    };

    export function compareByType(expected: any, actual: any): Result {
        if (expected instanceof Array) {
            return compareArray(actual, expected);
        } else if (expected instanceof Object) {
            return compareObject(actual, expected);
        } else if (typeof expected === "string") {
            return compareString(actual, expected);
        } else if (typeof expected === "number") {
            return compareNumber(actual, expected);
        } else if (typeof expected === "undefined") {
            return compareUndefined(actual, expected);
        }
        throw new TypeUnknownException("Unknown type ("+typeof expected+")");
    }

    export function compareArray(actual: Array<any>, expected: Array<any>): Result {
        let result: Result = {pass: true, message: ""};
        if (actual === undefined) {
            fail(result, "Actual object was undefined, while Expected was: " + JSON.stringify(expected));
            return result;
        }
        for (let i = 0; i < expected.length; i++) {
            let expectedItem = expected[i];
            let actualItem = actual[i];
            let testResult = {pass: true, message: ""};
            testResult = compareByType(expectedItem, actualItem, testResult);
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

    export function tab(someString: string): string {
        let lines = someString.split("\n");
        let tabbedLines = lines.map(function (line) {
            return "\t" + line;
        });
        return tabbedLines.join("\n");
    }

    function checkExtraKeysInActual(actual: Object, expected: Object, result: Result) {
        let keysInActualNotInExpected = Object.keys(actual).filter(function (key) {
            return !(key in expected)
        });
        if (keysInActualNotInExpected.length > 0) {
            result.pass = false;
            keysInActualNotInExpected.forEach(function (key) {
                result.message += "Actual object has extra key {" + key + ": " + actual[key] + "} which was not in the expected object.\n";
            })
        }
    }

    export function fail(result: Result, message: string) {
        result.message += message;
        result.pass = false;
    }

    export function compareObject(actual: Object, expected: Object): Result {
        let result: Result = {pass: true, message: ""};
        if (actual === undefined) {
            fail(result, "Actual object was undefined, while Expected was: " + JSON.stringify(expected));
            return result;
        }
        for (let key in expected) {
            let expectedItem = expected[key];
            if (key in actual) {
                let actualItem = actual[key];
                let testResult: Result = {pass: true, message: ""};
                testResult = compareByType(expectedItem, actualItem, testResult);
                if (!testResult.pass) {
                    fail(result, "Mismatch in key '" + key + "':\n" + tab(testResult.message) + "\n");
                }
            } else {
                fail(result, "Expected object has extra key {" + key + ": " + expectedItem + "} which could not be found in the actual object.\n");
            }
        }
        checkExtraKeysInActual(actual, expected, result);
        return result;
    }

    export function compareNumber(actual: number, expected: number): Result {
        let testResult: Result = {pass: true, message: ""};
        const DELTA = 0.0000001;
        let compareResult = Math.abs(expected - actual);
        // When key does not exist
        if (isNaN(compareResult)) {
            testResult.pass = false;
        }
        // Value does not match
        if (compareResult > DELTA) {
            testResult.pass = false;
        }
        if (!testResult.pass) {
            fail(testResult, "Expected " + actual + " to be " + expected)
        }
        return testResult;
    }

    export function compareString(actual: string, expected: string): Result {
        let testResult: Result = {pass: true, message: ""};
        let errorMessage;
        for (let i = 0; i < expected.length; i++) {
            if (!expected) {
                expected = "";
            }
            if (!actual) {
                actual = "";
            }
            if (i < actual.length && expected[i] !== actual[i]) {
                let backChars = Math.min(20, i);
                let forwardCharsExp = Math.min(20, expected.length - i);
                let forwardChartsAct = Math.min(20, actual.length - i);
                let expectedSome = expected.substring(i - backChars, i + forwardCharsExp);
                let cursor = Array(backChars + 1).join(" ") + "^";
                let actualSome = actual.substring(i - backChars, i + forwardChartsAct);
                let preview = "Comparing\n" + expectedSome + "\n" + cursor
                    + "\nwith\n" + actualSome + "\n" + cursor;
                testResult.pass = false;
                errorMessage = "Mismatch in character " + i + " when "
                    + preview + "\n<===EXPECTED " + expected + " ==> with <===ACTUAL "
                    + actual + " ==>\n";
                break;
            } else if (i === actual.length) {

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

    export function compareUndefined(actual: string, expected: string): Result {
        let testResult: Result = {pass: true, message: ""};
        if (actual) {
            testResult.pass = false;
            testResult.message = "Expected undefined but got " + JSON.stringify(actual);
        }
        return testResult;
    }

    class TypeUnknownException {
        message: string;
        constructor(message:string) {
            this.message = message;
        }
    }
}