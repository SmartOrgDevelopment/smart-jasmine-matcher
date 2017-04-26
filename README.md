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

For example, here is an object of arrays:

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
    
The above test produces the following failure:
    
    Mismatch in key 'UsainBolt':
	    Item 0 had a mismatch.
		    Expected 12 to be 10
	
    Mismatch in key 'CarlLewis':
	    Item 1 had a mismatch.
		    Expected 15 to be 13
		    
Let's now look at an array of objects:
		    
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
    
This produces the following failure:

        Item 0 had a mismatch.
            Mismatch in key 'name':
                Mismatch in character 4 when Comparing
                Menlo Park
                    ^
                with
                Menla Park
                    ^
                <===EXPECTED Menlo Park ==> with <===ACTUAL Menla Park ==>
            
            Mismatch in key 'population':
                Expected 15000 to be 10000
	
        Item 1 had a mismatch.
            Mismatch in key 'name':
                Mismatch in character 2 when Comparing
                Mountain View
                  ^
                with
                Moontain View
                  ^
                <===EXPECTED Mountain View ==> with <===ACTUAL Moontain View ==>
            
            Mismatch in key 'population':
                Expected 21000 to be 20000
            
## Installation

Run:

    bower install smart-jasmine-matcher --save-dev

Include bower_components/smart-jasmine-matcher/src/smartJasmineMatcher.js in your src imports.

Then, before all your jasmine tests, add this code:

    beforeEach(function () {
        jasmine.addMatchers(smartorg.test.matchers.smartMatcher);
    });

That's it! Continue using toEqual as you may already have.
Note that you must be on Jasmine 2 or higher.
