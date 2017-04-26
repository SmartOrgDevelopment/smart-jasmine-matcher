/// <reference path="../lib/vendorTypeDefinitions/jasmine.d.ts" />
/// <reference path="../src/smartJasmineMatcher.ts" />

describe('Demonstrating Smart Jasmine Matcher, ', function () {
    beforeEach(function () {
        jasmine.addMatchers(smartorg.test.matchers.smartMatcher);
    });

    describe("simple one-level dictionary", function() {
        let menloPark = {name: "Menlo Park", population: 10000};
        it("with mismatch of values", function () {
            let mountainView = {population: 20000, name: "Mountain View"};
            expect(menloPark).toEqual(mountainView);
        });

        it("with extra keys in actual", function () {
            let menloParkWithArea = {
                name: "Menlo Park", population: 10000, area: 5000
            };
            expect(menloParkWithArea).toEqual(menloPark);
        });
        it("with extra keys in expected", function () {
            let menloParkSmall = {
                name: "Menlo Park"
            };
            expect(menloParkSmall).toEqual(menloPark);
        });
        it("with empty actual", function() {
            let empty = {

            };
            expect(empty).toEqual(menloPark);
        });
        it("with empty expected", function() {
            let empty = {

            };
            expect(menloPark).toEqual(empty);
        });
        it("with undefined expected", function() {
            expect(menloPark).toEqual(undefined);
        });
        it("with undefined actual", function() {
            expect(undefined).toEqual(menloPark);
        });
    });
    describe("simple array of numbers", function() {
        let points = [10,20,30];
        it("Same size with mismatch", function () {
            let otherPoints = [20,40,60];
            expect(otherPoints).toEqual(points);
        });
        it("Matched but more numbers in expected", function () {
            let otherPoints = [10,20];
            expect(otherPoints).toEqual(points);
        });
        it("Mismatched and more numbers in expected", function () {
            let otherPoints = [50,60];
            expect(otherPoints).toEqual(points);
        });
        it("Matched but more numbers in actual", function () {
            let otherPoints = [10,20,30,40];
            expect(otherPoints).toEqual(points);
        });
        it("Mismatched and more numbers in actual", function () {
            let otherPoints = [50,60,70,80];
            expect(otherPoints).toEqual(points);
        });
        it("Empty actual", function() {
            let otherPoints = [];
            expect(otherPoints).toEqual(points);
        });
        it("Empty expected", function() {
            let otherPoints = [];
            expect(points).toEqual(otherPoints);
        });
        it("Undefined actual", function() {
            let otherPoints = undefined;
            expect(otherPoints).toEqual(points);
        });
        it("Undefined expected", function() {
            let otherPoints = undefined;
            expect(points).toEqual(otherPoints);
        });
    });
    describe("Array of objects", function () {
        let citiesInBayArea = [
            { "name": "Menlo Park", population: 10000},
            { "name": "Mountain View", population: 20000}
        ];
        it("mismatch", function() {
            let anotherListOfCitiesInBayArea = [
                { "name": "Menla Park", population: 15000},
                { "name": "Moontain View", population: 21000}
            ];
            expect(anotherListOfCitiesInBayArea).toEqual(citiesInBayArea);
        });

    });

    describe("Object of arrays", function () {
        let sprintRecords = {
            UsainBolt: [10,11,1.5],
            CarlLewis: [12,13,2]
        };
        it("mismatch", function() {
            let otherSprintRecords = {
                UsainBolt: [12,11,1.5],
                CarlLewis: [12,15,2]
            };
            expect(otherSprintRecords).toEqual(sprintRecords);
        });

    });
    describe("Object of objects", function () {
        let birdData = {
            eagle: {
                wingspan: 10,
                weight: 12,
                name: "Eagle"
            },
            vulture: {
                wingspan: 12,
                weight: 10,
                name: "Vulture"
            }
        };
        it("mismatch", function() {
            let otherBirdData = {
                eagle: {
                    wingspan: 13,
                    weight: 14,
                    name: "Eegle"
                },
                vulture: {
                    wingspan: 17,
                    weight: 18,
                    height: 15,
                    name: "Voulture"
                }
            };
            expect(otherBirdData).toEqual(birdData);
        });

    });
    describe("Array of arrays", function () {
        let arrayOfPoints = [
            [10,20, "Point 1"],
            [30,40, "Point 2"],
            [50,60, "Point 3"]
        ];
        it("mismatch", function() {
            let otherArrayOfPoints = [
                [11,13, "point 1"],
                [55,77, "point 2"],
                [88,99, "point 3"]
            ];
            expect(otherArrayOfPoints).toEqual(arrayOfPoints);
        });

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

    it("Failed string compare in object match 5", function () {
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


});