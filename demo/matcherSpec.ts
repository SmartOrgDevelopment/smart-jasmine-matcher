/// <reference path="../lib/vendorTypeDefinitions/jasmine.d.ts" />
/// <reference path="../src/smartJasmineMatcher.ts" />

describe('Demonstrating Smart Jasmine Matcher', function () {
    beforeEach(function () {
        jasmine.addMatchers(smartorg.test.matchers.smartMatcher);
    });

    it("Failed undefined match", function () {
        let a = {a: "abc", b: "aaa"};
        let b = {a: "aaa", b: "aaa"};
        expect(a).toEqual(b);
    });

    // it("Failed undefined match", function () {
    //     let a = undefined;
    //     let b = undefined;
    //     expect(a).toBe(b);
    // });
    //
    it("Failed undefined match", function () {
        let a = 1;
        let b = undefined;
        expect(a).toBe(b);
    });
    //
    // it("Failed undefined match", function () {
    //     let a = undefined;
    //     let b = "undefined";
    //     expect(a).toBe(b);
    // });
    //
    it("Failed undefined match", function () {
        let a = 1;
        let b = "1";
        // let result = expect(a as any).not.toEqual(b);
        expect(a).toBe(b);
    });

    it("Failed undefined match", function () {
        let a = [1];
        let b = "1";
        // let result = expect(a as any).not.toEqual(b);
        expect(a).toBe(b);
    });

    it("Failed undefined match", function () {
        let a = [1];
        let b = {a: "1"};
        // let result = expect(a as any).not.toEqual(b);
        expect(a).toBe(b);
    });

    it("Failed array of number match", function () {
        let a = [10, 20, 40];
        let b = [10, 30];
        expect(a).toEqual(b);
    });

    it("Failed array of string match", function () {
        let actual = ["aaa", "bhb", "cmc"];
        let expected = ["abc", "bbb", "ccc"];
        expect(actual).toEqual(expected);
    });

    it("Failed array with 0 length match", function () {
        let actual = ["aaa", "bhb", "cmc"];
        let expected = [];
        expect(actual).toEqual(expected);
    });

    it("Failed array of object match", function () {
        let actual = [{a: "aya"}, {b: "bkb"}];
        let expected = [{a: "aaa"}, {b: "bbb"}];
        expect(actual).toEqual(expected);
    });

    it("Failed array of undefined match", function () {
        let actual = [undefined, {b: "bkb"}];
        let expected = [undefined, undefined];
        expect(actual).toEqual(expected);
    });

    it("Failed object match 1", function () {
        let menloPark = {name: "Menlo Park", population: 100000};
        let mountainView = {name: "Mountain View", population: 200000};
        expect(mountainView).toEqual(menloPark);
    });

    it("Failed object match 2", function () {
        let menloPark = {name: "Menlo Park"};
        let mountainView = {name: "Mountain View"};
        expect(mountainView).toEqual(menloPark);
    });

    it("Failed stirng compare in object match 3", function () {
        let actual = {name: ""};
        let expected = {name: "b"};
        expect(actual).toEqual(expected);
    });

    it("Failed stirng compare in object match 4", function () {
        let actual = {name: "dfsfs"};
        let expected = {name: ""};
        expect(actual).toEqual(expected);
    });

    it("Failed stirng compare in object match 5", function () {
        let actual = {name: "aaaa"};
        let expected = {name: "bbbbb"};
        expect(actual).toEqual(expected);
    });

    it("Failed stirng compare in object match 6", function () {
        let actual = {name: "aaaa"};
        let expected = {name: "abbbb"};
        expect(actual).toEqual(expected);
    });

    it("Failed undefined match", function () {
        let actual = {name: "aaaa"};
        let expected = {name: undefined};
        expect(actual).toEqual(expected);
    });

    it("Failed object with multiple keys 1", function () {
        let actual = {
            "SendBack": "Tree!F11",
            "Key": "value_given_success",
            "Reference": "TornadoDistOutputs[0].Mean",
            "Title": "Mean" //diff line
        };
        let expected = {
            "SendBack": "Tree!F11",
            "Key": "value_given_success",
            "Reference": "TornadoDistOutputs[0].Mean",
            "Title": "Mean of Net-Present Value" //diff line
        };
        expect(actual).toEqual(expected);
    });

    it("Failed object with multiple keys 2", function () {
        let actual = {
            "SendBack": "Tree!F11",
            "Key": "value_given_success",
            "Reference": "TornadoDistOutputs[0].Mean",
            "Title": "Meen" //diff line
        };
        let expected = {
            "SendBack": "Tree!F11",
            "Key": "value_given_success",
            "Reference": "TornadoDistOutputs[0].Mean",
            "Title": "Mean" //diff line
        };
        expect(actual).toEqual(expected);
    });

    it("Failed array of objects match", function () {
        let postProcessing = [
            {
                "SendBack": "Tree!F11",
                "Key": "value_given_success",
                "Reference": "TornadoDistOutputs[0].Mean",
                "Title": "Mean of Net-Present Value"
            },
            {
                "SendBack": "Tree!F8",
                "Key": "High_Calculations_npv",
                "Reference": "TornadoDistOutputs[0].Summary[2]",
                "Title": "High of Net-Present Value"
            },
            {
                "SendBack": "Tree!F9",
                "Key": "Med_Calculations_npv",
                "Reference": "TornadoDistOutputs[0].Summary[1]",
                "Title": "Med of Net-Present Value"
            },
            {
                "SendBack": "Tree!F10",
                "Key": "Low_Calculations_npv",
                "Reference": "TornadoDistOutputs[0].Summary[0]",
                "Title": "Low of Net-Present Value"
            }
        ];
        let expectedPostProcessing = [
            {
                "SendBack": "Tree!F11",
                "Key": "value_given_success",
                "Reference": "TornadoDistOutputs[0].Mean",
                "Title": "Mean of Net-Present Value"
            },
            {
                "SendBack": "Tree!F8",
                "Key": "High_Calculations_npv",
                "Reference": "TornadoDistOutputs[0].Summary[2]",
                "Title": "High of Net-Present Value"
            },
            {
                "SendBack": "Tree!F9",
                "Key": "Med_Calculations_npv",
                "Reference": "TornadoDistOutputs[0].Summary[1]",
                "Title": "Med of Net-Present Value"
            },
            {
                "SendBack": "Tree!F10",
                "Key": "Low_Calculations_npv",
                "Reference": "TornadoDistOutputs[0].Summary[0]",
                "Title": "Value"
            }
        ];

        expect(postProcessing).toEqual(expectedPostProcessing);
    });
});