/// <reference path="../lib/vendorTypeDefinitions/jasmine.d.ts" />
/// <reference path="../src/smartJasmineMatcher.ts" />
describe('Demonstrating Smart Jasmine Matcher', function () {
    beforeEach(function () {
        jasmine.addMatchers(smartorg.test.matchers.smartMatcher);
    });
    // it("Failed array match", function () {
    //     var a = [10, 20, 40];
    //     var b = [10, 30];
    //     expect(a).toEqual(b);
    // });
    it("Failed object match 1", function () {
        var menloPark = { name: "Menlo Park", population: 100000 };
        var mountainView = { name: "Mountain View", population: 200000 };
        // var menloPark = { name: "Menlo Park"};
        // var mountainView = { name: "Mountain View"};
        expect(mountainView).toEqual(menloPark);
    });
    //
    //  it("Failed object match 2", function() {
    //     var menloPark = { name: "Menlo Park"};
    //     var mountainView = { name: "Mountain View"};
    //     expect(mountainView).toEqual(menloPark);
    // });
    //
    //  it("Failed stirng compare in object match 1", function() {
    //     var actual = { name: ""};
    //     var expected = { name: "b"};
    //     expect(actual).toEqual(expected);
    // });
    //  it("Failed stirng compare in object match 2", function() {
    //     var actual = { name: "dfsfs"};
    //     var expected = { name: ""};
    //     expect(actual).toEqual(expected);
    // });
    //  it("Failed stirng compare in object match 3", function() {
    //     var actual = { name: "aaaa"};
    //     var expected = { name: "bbbb"};
    //     expect(actual).toEqual(expected);
    // });
    //  it("Failed stirng compare in object match 4", function() {
    //     var actual = { name: "aaaa"};
    //     var expected = { name: "abbb"};
    //     expect(actual).toEqual(expected);
    // });
});
