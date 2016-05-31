/// <reference path="typings/jasmine/jasmine.d.ts" />
'use strict';


describe('isBlank', function() {
    it('empty string is blank', function  (){
        var blankResult = isBlank("");
        expect(blankResult).toBe(true);
    });
    it('undefined is blank', function  (){
        var blankResult = isBlank(undefined);
        expect(blankResult).toBe(true);
    });
    it('space is blank', function  (){
        var blankResult = isBlank(" ");
        expect(blankResult).toBe(true);
    });        
    it('valid result is not blank', function  (){
        var blankResult = isBlank("1:0");
        expect(blankResult).toBe(false);        
    })
});
    

describe('NormaliseResult', function() {
    it('1:0  should be normalised to 1:0', function() {
        var normalisedResult = NormaliseResult("1:0");
        expect(normalisedResult).toBe("1:0");        
    });
    it('1 : 0  should be normalised to 1:0', function() {
        var normalisedResult = NormaliseResult("1 : 0");
        expect(normalisedResult).toBe("1:0");        
    });
    it('1 - 0  should be normalised to 1:0', function() {
        var normalisedResult = NormaliseResult("1 - 0");
        expect(normalisedResult).toBe("1:0");        
    });        
    it(' 1   - 0  should be normalised to 1:0', function() {
        var normalisedResult = NormaliseResult(" 1   - 0 ");
        expect(normalisedResult).toBe("1:0");        
    });    
});

describe('GetResultType', function() {
    it('1:0  result is type 1', function() {
        var resultType = GetResultType("1:0");
        expect(resultType).toBe(1);
    });
    it('1:1  result is type 0', function() {
        var resultType = GetResultType("0:0");
        expect(resultType).toBe(0);
    });
    it('0:1  result is type 2', function() {
        var resultType = GetResultType("0:1");
        expect(resultType).toBe(2);
    });                
});
    

describe('GetPointsForPrognosis', function() {
    it('1:0 result and 1:0 expect should give 3 points', function() {
        var points = GetPointsForPrognosis("1:0", "1:0", 3, 1, 0);
        expect(points).toBe(3);        
    }); 
    it('1:0 result and 2:0 expect should give 1 point', function() {
        var points = GetPointsForPrognosis("1:0", "2:0", 3, 1, 0);
        expect(points).toBe(1);        
    });  
    it('1:0 result and 0:0 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("1:0", "0:0", 3, 1, 0);
        expect(points).toBe(0);        
    });
    it('1:0 result and 0:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("1:0", "0:1", 3, 1, 0);
        expect(points).toBe(0);        
    }); 
    
    it('1:1 result and 1:0 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("1:1", "1:0", 3, 1, 0);
        expect(points).toBe(0);        
    }); 
    it('1:1 result and 1:1 expect should give 3 points', function() {
        var points = GetPointsForPrognosis("1:1", "1:1", 3, 1, 0);
        expect(points).toBe(3);        
    });  
    it('1:1 result and 2:2 expect should give 1 point', function() {
        var points = GetPointsForPrognosis("1:1", "2:2", 3, 1, 0);
        expect(points).toBe(1);        
    });
    it('1:1 result and 0:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("1:1", "0:1", 3, 1, 0);
        expect(points).toBe(0);        
    });  
    
    it('0:1 result and 1:0 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("0:1", "1:0", 3, 1, 0);
        expect(points).toBe(0);        
    }); 
    it('0:1 result and 1:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("0:1", "1:1", 3, 1, 0);
        expect(points).toBe(0);        
    });  
    it('0:1 result and 0:2 expect should give 1 point', function() {
        var points = GetPointsForPrognosis("0:1", "0:2", 3, 1, 0);
        expect(points).toBe(1);        
    });
    it('0:1 result and 0:1 expect should give 3 points', function() {
        var points = GetPointsForPrognosis("0:1", "0:1", 3, 1, 0);
        expect(points).toBe(3);        
    }); 
    
    it('empty string result and 0:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("", "0:1", 3, 1, 0);
        expect(points).toBe(0);        
    });
    it('undefined string result and 0:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis(undefined, "0:1", 3, 1, 0);
        expect(points).toBe(0);        
    });                                 
});
    