/// <reference path="../lib/vendorTypeDefinitions/jasmine.d.ts" />
/// <reference path="../src/smartJasmineMatcher.ts" />
describe('Demonstrating Smart Jasmine Matcher', function () {
    beforeEach(function () {
        jasmine.addMatchers(smartorg.test.matchers.smartMatcher);
    });
    it("Failed array match", function () {
        var a = [10, 20, 40];
        var b = [10, 30];
        expect(a).toEqual(b);
    });
    // it("Failed object match", function() {
    //     var menloPark = { name: "Menlo Park", population: 100000};
    //     var mountainView = { name: "Mountain View", population: 200000};
    //     expect(mountainView).toEqual(menloPark);
    // })
});
