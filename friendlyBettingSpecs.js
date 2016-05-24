/// <reference path="typings/jasmine/jasmine.d.ts" />
'use strict';

describe('NormaliseResult', function() {
    it(' 1  - 0  should be normalised to 1:0', function() {
        var normalisedResult = NormaliseResult(" 1  - 0 ");
        expect(normalisedResult).toBe("1:0");        
    }); 
});
    


describe('GetPointsForMatch', function() {
    it('1:0 result and 1:0 expect should give 3 points', function() {
        var points = GetPointsForMatch("1:0", "1:0", 3, 1);
        expect(points).toBe(3);        
    }); 
});
    