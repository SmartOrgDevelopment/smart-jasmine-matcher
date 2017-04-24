/// <reference path="../lib/vendorTypeDefinitions/jasmine.d.ts" />
/// <reference path="../src/smartJasmineMatcher.ts" />

describe('Demonstrating Smart Jasmine Matcher', function () {
    beforeEach(function () {
        jasmine.addMatchers(smartorg.test.matchers.smartMatcher);
    });

    it("Failed array of number match", function () {
        var a = [10, 20, 40];
        var b = [10, 30];
        expect(a).toEqual(b);
    });

    it("Failed array of string match", function () {
        var actual = ["aaa", "bhb", "cmc"];
        var expected = ["abc", "bbb", "ccc"];
        expect(actual).toEqual(expected);
    });

    it("Failed array with 0 length match", function () {
        var actual = ["aaa", "bhb", "cmc"];
        var expected = [];
        expect(actual).toEqual(expected);
    });

    it("Failed array of object match", function () {
        var actual = [{a: "aya"}, {b: "bkb"}];
        var expected = [{a: "aaa"}, {b: "bbb"}];
        expect(actual).toEqual(expected);
    });

    it("Failed array of undefined match", function () {
        var actual = [undefined, {b: "bkb"}];
        var expected = [undefined, undefined];
        expect(actual).toEqual(expected);
    });

    it("Failed object match 1", function () {
        var menloPark = {name: "Menlo Park", population: 100000};
        var mountainView = {name: "Mountain View", population: 200000};
        expect(mountainView).toEqual(menloPark);
    });

    it("Failed object match 2", function () {
        var menloPark = {name: "Menlo Park"};
        var mountainView = {name: "Mountain View"};
        expect(mountainView).toEqual(menloPark);
    });

    it("Failed stirng compare in object match 3", function () {
        var actual = {name: ""};
        var expected = {name: "b"};
        expect(actual).toEqual(expected);
    });

    it("Failed stirng compare in object match 4", function () {
        var actual = {name: "dfsfs"};
        var expected = {name: ""};
        expect(actual).toEqual(expected);
    });

    it("Failed stirng compare in object match 5", function () {
        var actual = {name: "aaaa"};
        var expected = {name: "bbbbb"};
        expect(actual).toEqual(expected);
    });

    it("Failed stirng compare in object match 6", function () {
        var actual = {name: "aaaa"};
        var expected = {name: "abbbb"};
        expect(actual).toEqual(expected);
    });

    it("Failed undefined match", function () {
        var actual = {name: "aaaa"};
        var expected = {name: undefined};
        expect(actual).toEqual(expected);
    });

    it("Failed object with multiple keys 1", function () {
        var actual = {
            "SendBack": "Tree!F11",
            "Key": "value_given_success",
            "Reference": "TornadoDistOutputs[0].Mean",
            "Title": "Mean" //diff line
        };
        var expected = {
            "SendBack": "Tree!F11",
            "Key": "value_given_success",
            "Reference": "TornadoDistOutputs[0].Mean",
            "Title": "Mean of Net-Present Value" //diff line
        };
        expect(actual).toEqual(expected);
    });

    it("Failed object with multiple keys 2", function () {
        var actual = {
            "SendBack": "Tree!F11",
            "Key": "value_given_success",
            "Reference": "TornadoDistOutputs[0].Mean",
            "Title": "Meen" //diff line
        };
        var expected = {
            "SendBack": "Tree!F11",
            "Key": "value_given_success",
            "Reference": "TornadoDistOutputs[0].Mean",
            "Title": "Mean" //diff line
        };
        expect(actual).toEqual(expected);
    });

    it("Failed array of objects match", function () {
        var postProcessing = [
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
        var expectedPostProcessing = [
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