## Introduction

The Smart Matcher overrides Jasmine's toEqual() matcher and gives you
phenomenal granularity in complex object or string comparisons. If you are heavy on
Test-Driven Development, this is a matcher you can't live without.

Here's an example:

    var string1 = "Yankee Doodle went to town, riding on a pony."
    var string2 = "Yankee Doodle went to twon, riding on a pony."
    expect(string1).toEqual(string2);

This produces the following failure message:

    Mismatch in character 23 when Comparing
    kee Doodle went to twon, riding on a pon
                        ^
    with
    kee Doodle went to town, riding on a pon
                        ^
    <===EXPECTED Yankee Doodle went to twon, riding on a pony. ==> with <===ACTUAL Yankee Doodle went to town, riding on a pony. ==>

This pinpoints the precise location of the mismatch, and gives you enough of a preview snippet to get context.

Advanced objects and arrays are also handled to show clear points of mismatch.

## Installation

Run:

    bower install smart-jasmine-matcher --save-dev

Then, before all your jasmine tests, add this code:

    beforeEach(function () {
        jasmine.addMatchers(smartorg.test.matchers.smartMatcher);
    });

That's it! Continue using toEqual as you may already have.
Note that you must be on Jasmine 2 or higher.
