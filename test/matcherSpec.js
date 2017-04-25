/// <reference path="../lib/vendorTypeDefinitions/jasmine.d.ts" />
/// <reference path="../src/smartJasmineMatcher.ts" />
describe('Smart Jasmine Matcher', function () {
    var matcher;
    beforeEach(function () {
        matcher = smartorg.test.matchers.smartMatcher;
    });
    it("should tab correctly", function () {
        var msg = "Yankee doodle went to town\n" +
            "Riding on a pony\n" +
            "He stuck a feather in his cap\n" +
            "And called it macaroni.";
        var expectedMsg = "\tYankee doodle went to town\n" +
            "\tRiding on a pony\n" +
            "\tHe stuck a feather in his cap\n" +
            "\tAnd called it macaroni.";
        expect(smartorg.test.matchers.tab(msg)).toEqual(expectedMsg);
    });
});
