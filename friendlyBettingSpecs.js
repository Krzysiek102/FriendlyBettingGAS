/// <reference path="typings/jasmine/jasmine.d.ts" />
'use strict';

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

describe('isValid', function() {
    it('empty string is not valid', function  (){
        var blankResult = IsValid("");
        expect(blankResult).toBe(false);
    });
    it('undefined is not valid', function  (){
        var blankResult = IsValid(undefined);
        expect(blankResult).toBe(false);
    });
    it('space is not valid', function  (){
        var blankResult = IsValid(" ");
        expect(blankResult).toBe(false);
    });        
    it('1:0 result is valid', function  (){
        var blankResult = IsValid('1:0');
        expect(blankResult).toBe(true);        
    });
    it('12:8 result is valid', function  (){
        var blankResult = IsValid('12:8');
        expect(blankResult).toBe(true);        
    });    
    it('fff is not valid', function  (){
        var blankResult = IsValid('fff');
        expect(blankResult).toBe(false);        
    });
    it('12 - 8 normalised is valid', function  (){
        var blankResult = IsValid(NormaliseResult('12 - 8'));
        expect(blankResult).toBe(true);        
    });         
});


describe('ParseResult', function() {
    it('1:0 should be result type 1, goals scored 1 and goals lost 0', function() {
        var parsedResult = ParseResult("1:0");
        expect(parsedResult.type).toBe(1);
        expect(parsedResult.scored).toBe(1);
        expect(parsedResult.lost).toBe(0);
    });
    it('2:2 should be result type 0, goals scored 2 and goals lost 2', function() {
        var parsedResult = ParseResult("2:2");
        expect(parsedResult.type).toBe(0);
        expect(parsedResult.scored).toBe(2);
        expect(parsedResult.lost).toBe(2);
    });  
    it('1:2 should be result type 2, goals scored 1 and goals lost 2', function() {
        var parsedResult = ParseResult("1:2");
        expect(parsedResult.type).toBe(2);
        expect(parsedResult.scored).toBe(1);
        expect(parsedResult.lost).toBe(2);
    });      
        
});    
    

describe('GetPointsForPrognosis', function() {
    it('1:0 result and 1:0 expect should give 3 points', function() {
        var points = GetPointsForPrognosis("1:0", "1:0");
        expect(points).toBe(3);        
    }); 
    it('1:0 result and 2:0 expect should give 2 points', function() {
        var points = GetPointsForPrognosis("1:0", "2:0");
        expect(points).toBe(2);        
    });
    it('2:1 result and 3:1 expect should give 2 points', function() {
        var points = GetPointsForPrognosis("2:1", "3:1");
        expect(points).toBe(2);        
    });    
    it('1:0 result and 2:1 expect should give 1 point', function() {
        var points = GetPointsForPrognosis("1:0", "2:1");
        expect(points).toBe(1);        
    });      
    it('1:0 result and 0:0 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("1:0", "0:0");
        expect(points).toBe(0);        
    });
    it('1:0 result and 0:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("1:0", "0:1");
        expect(points).toBe(0);        
    }); 
    
    it('1:1 result and 1:0 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("1:1", "1:0");
        expect(points).toBe(0);        
    }); 
    it('1:1 result and 1:1 expect should give 3 points', function() {
        var points = GetPointsForPrognosis("1:1", "1:1");
        expect(points).toBe(3);        
    });  
    it('1:1 result and 2:2 expect should give 1 point', function() {
        var points = GetPointsForPrognosis("1:1", "2:2");
        expect(points).toBe(1);        
    });
    it('1:1 result and 0:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("1:1", "0:1");
        expect(points).toBe(0);        
    });  
    
    it('0:1 result and 1:0 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("0:1", "1:0");
        expect(points).toBe(0);        
    }); 
    it('0:1 result and 1:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("0:1", "1:1");
        expect(points).toBe(0);        
    });  
    it('0:1 result and 0:2 expect should give 2 points', function() {
        var points = GetPointsForPrognosis("0:1", "0:2");
        expect(points).toBe(2);        
    });
    it('1:2 result and 1:3 expect should give 2 points', function() {
        var points = GetPointsForPrognosis("1:2", "1:3");
        expect(points).toBe(2);        
    });     
    it('0:1 result and 1:2 expect should give 1 point', function() {
        var points = GetPointsForPrognosis("0:1", "1:2");
        expect(points).toBe(1);        
    });    
    it('0:1 result and 0:1 expect should give 3 points', function() {
        var points = GetPointsForPrognosis("0:1", "0:1");
        expect(points).toBe(3);        
    }); 
    
    it('empty string result and 0:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis("", "0:1");
        expect(points).toBe(0);        
    });
    it('undefined string result and 0:1 expect should give 0 points', function() {
        var points = GetPointsForPrognosis(undefined, "0:1");
        expect(points).toBe(0);        
    });                                 
});


describe('GetWeightedPointsForPrognosis', function() {
    it('1:0 exact and 2:1 prognosis with weight 2 should give 2 points', function() {
        var points = GetWeightedPointsForPrognosis("1:0", "2:1", 2);
        expect(points).toBe(2);
    });
    it('1:0 exact and 2:0 prognosis with weight 2 should give 4 points', function() {
        var points = GetWeightedPointsForPrognosis("1:0", "2:0", 2);
        expect(points).toBe(4);
    });
    it('1:0 exact and 1:0 prognosis with weight 2 should give 6 points', function() {
        var points = GetWeightedPointsForPrognosis("1:0", "1:0", 2);
        expect(points).toBe(6);
    });        
    it('2:1 exact and 3:2 prognosis with weight 3 should give 3 points', function() {
        var points = GetWeightedPointsForPrognosis("2:1", "3:2", 3);
        expect(points).toBe(3);
    }); 
    it('2:1 exact and 2:0 prognosis with weight 3 should give 6 points', function() {
        var points = GetWeightedPointsForPrognosis("2:1", "2:0", 3);
        expect(points).toBe(6);
    }); 
    it('2:1 exact and 2:1 prognosis with weight 3 should give 9 points', function() {
        var points = GetWeightedPointsForPrognosis("2:1", "2:1", 3);
        expect(points).toBe(9);
    });       
});


describe('NumberOfExactMatch', function() {
    it('2:1, 1:0 exact and 2:1, 1:0 prognosis has 2 exact match', function() {
        var points = NumberOfExactMatch(["2:1", "1:0"], ["2:1", "1:0"]);
        expect(points).toBe(2);
    });   
    it('2:1, 1:0 exact and 2:1, 1:1 prognosis has 1 exact match', function() {
        var points = NumberOfExactMatch(["2:1", "1:0"], ["2:1", "1:1"]);
        expect(points).toBe(1);
    }); 
    it('2:1, 1:0 exact and 1:2, 0:1 prognosis has 0 exact match', function() {
        var points = NumberOfExactMatch(["2:1", "1:0"], ["1:2", "0:1"]);
        expect(points).toBe(0);
    });               
});

describe('NumberOfLooseMatch', function() {
    it('2:1, 1:0 exact and 3:1, 2:1 prognosis has 2 loose match', function() {
        var points = NumberOfLooseMatch(["2:1", "1:0"], ["3:1", "2:1"]);
        expect(points).toBe(2);
    });   
    it('2:1, 1:0 exact and 3:1, 1:1 prognosis has 1 loose match', function() {
        var points = NumberOfLooseMatch(["2:1", "1:0"], ["3:1", "1:1"]);
        expect(points).toBe(1);
    }); 
    it('2:1, 1:0 exact and 1:1, 0:1 prognosis has 0 loose match', function() {
        var points = NumberOfLooseMatch(["2:1", "1:0"], ["1:1", "0:1"]);
        expect(points).toBe(0);
    });               
});

describe('GoalsAverage', function() {
    it('2:1, 1:1 should give 2.5 goals average', function() {
        var points = GoalsAverage(["2:1", "1:1"]);
        expect(points).toBe(2.5);
    });
    it('aaa, 1:1 should give 2 goals average', function() {
        var points = GoalsAverage(["aaa", "1:1"]);
        expect(points).toBe(2);
    });  
    it('aaa should give 0 goals average', function() {
        var points = GoalsAverage(["aaa"]);
        expect(points).toBe(0);
    });     
    it('3:2, 1:1, 0:0, 4:0 should give 2.75 goals average', function() {
        var points = GoalsAverage(["3:2", "1:1", "0:0", "4:0"]);
        expect(points).toBe(2.75);
    });              
});

describe('NumberOfDraws', function() {
    it('2:1, 1:1 has 1 draw', function() {
        var points = NumberOfDraws(["2:1", "1:1"]);
        expect(points).toBe(1);
    });     
    it('2:1, 1:1, 1:3, 0:0 has 2 draws', function() {
        var points = NumberOfDraws(["2:1", "1:1", "1:3", "0:0"]);
        expect(points).toBe(2);
    });           
});

describe('NumberOfWinsToZero', function() {
    it('2:1, 1:0 has 1 win to zero', function() {
        var points = NumberOfWinsToZero(["2:1", "1:0"]);
        expect(points).toBe(1);
    });     
    it('2:1, 1:1, 0:3, 1:0 has 2 wins to zero', function() {
        var points = NumberOfWinsToZero(["2:1", "1:1", "0:3", "1:0"]);
        expect(points).toBe(2);
    });           
});

describe('GoalDifference', function() {
    it('0:0 has 0 goal difference', function() {
        var points = GoalDifference(0,0);
        expect(points).toBe(0);
    });   
    it('1:1 has 0 goal difference', function() {
        var points = GoalDifference(1,1);
        expect(points).toBe(0);
    }); 
    it('3:1 has 2 goal difference', function() {
        var points = GoalDifference(3,1);
        expect(points).toBe(2);
    });  
    it('2:5 has 3 goal difference', function() {
        var points = GoalDifference(2,5);
        expect(points).toBe(3);
    });                          
});

describe('NumberOfMatchesWithOneGoalDifference', function() {
    it('3:1, 1:0 has 1 match with 1 goal difference', function() {
        var points = NumberOfMatchesWithOneGoalDifference(["3:1", "1:0"]);
        expect(points).toBe(1);
    });     
    it('2:1, 1:1, 0:3, 1:0 has 2 matches with 1 goal difference', function() {
        var points = NumberOfMatchesWithOneGoalDifference(["2:1", "1:1", "0:3", "1:0"]);
        expect(points).toBe(2);
    });           
});

describe('NumberOfMatchesWithTwoGoalDifference', function() {
    it('3:1, 1:0 has 1 match with 2 goal difference', function() {
        var points = NumberOfMatchesWithTwoGoalDifference(["3:1", "1:0"]);
        expect(points).toBe(1);
    });     
    it('3:1, 1:1, 1:3, 1:0 has 2 matches with 2 goal difference', function() {
        var points = NumberOfMatchesWithTwoGoalDifference(["3:1", "1:1", "1:3", "1:0"]);
        expect(points).toBe(2);
    });           
});

describe('NumberOfMatchesWithMoreThenTwoGoalDifference', function() {
    it('4:1, 1:0 has 1 match with 2 goal difference', function() {
        var points = NumberOfMatchesWithMoreThenTwoGoalDifference(["4:1", "1:0"]);
        expect(points).toBe(1);
    });     
    it('4:1, 1:1, 0:3, 1:0 has 2 matches with 2 goal difference', function() {
        var points = NumberOfMatchesWithMoreThenTwoGoalDifference(["4:1", "1:1", "0:3", "1:0"]);
        expect(points).toBe(2);
    });           
});


    
    
    