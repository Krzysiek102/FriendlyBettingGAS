function NormaliseResult (result){
    if (result===undefined){
        return undefined;
    } 
    return result.replace(/ /g,'').replace('-',':').replace(';',':');
}

function IsValid(str) {
    if (str === undefined){
        return false;
    } 
    var pattern = /^\d+:\d+$/;
    return pattern.test(str);
}

function ParseResult (result){
    var resultSplitted = result.split(":");
    var scored = Number(resultSplitted[0]);
    var lost = Number(resultSplitted[1]);
    var type;
    if (scored > lost){
        type = 1;
    }else if (scored === lost){
        type = 0;
    }else {
        type = 2;
    }
    return {
        type: type,
        scored: scored,
        lost: lost
    }
}

function GetPointsForPrognosis(exact, prognosis){
    var noMatch = 0;
    var looseMatch = 1;
    var halfExactMatch = 2;
    var exactMatch = 3;
    
    exact = NormaliseResult(exact);
    prognosis = NormaliseResult(prognosis);
    if (!IsValid(exact) || !IsValid(prognosis)){
        return noMatch;
    }
    
    var parsedExact = ParseResult(exact);
    var parsedPrognosis = ParseResult(prognosis);
    if (parsedExact.type === parsedPrognosis.type){
        if (parsedExact.scored === parsedPrognosis.scored && parsedExact.lost === parsedPrognosis.lost){
            return exactMatch;
        }else{
            if (parsedExact.scored === parsedPrognosis.scored || parsedExact.lost === parsedPrognosis.lost){
                return halfExactMatch;
            }else{
                return looseMatch;
            }
        }
    }else{
        return noMatch;
    }
}

function GetWeightedPointsForPrognosis (exact, prognosis, weight){
    return weight * GetPointsForPrognosis(exact, prognosis);
}

function NumberOfExactMatch(exactArray, prognosisArray){
    var matchCount = 0;
    for (var i = 0; i<exactArray.length; i++){
         var exact = exactArray[i].toString();
         var prognosis = prognosisArray[i].toString();
         var pointsForPrognosis = GetPointsForPrognosis(exact, prognosis);
         if (pointsForPrognosis === 3)
         {
             matchCount++;
         }
    }
    return matchCount;
}

function NumberOfLooseMatch(exactArray, prognosisArray){
    var matchCount = 0;
    for (var i = 0; i<exactArray.length; i++){
         var exact = exactArray[i].toString();
         var prognosis = prognosisArray[i].toString();
         var pointsForPrognosis = GetPointsForPrognosis(exact, prognosis);
         if (pointsForPrognosis >0)
         {
             matchCount++;
         }
    }
    return matchCount;
}

function GoalsAverage(prognosisArray){
    var sum = 0;
    var count = 0;
    for (var i = 0; i<prognosisArray.length; i++){
         var prognosis = prognosisArray[i].toString();
         prognosis = NormaliseResult(prognosis);
         if (!IsValid(prognosis)){
            continue;
         }
         var parsedPrognosis = ParseResult(prognosis);
         sum += parsedPrognosis.scored + parsedPrognosis.lost;
         count++;        
    }
    if (count === 0){
        return 0;
    }
    return sum/count;
}

function NumberOfDraws(prognosisArray){
    var count = 0;
    for (var i = 0; i<prognosisArray.length; i++){
         var prognosis = prognosisArray[i].toString();
         prognosis = NormaliseResult(prognosis);
         if (IsValid(prognosis)){
            var parsedPrognosis = ParseResult(prognosis);
            if (parsedPrognosis.scored === parsedPrognosis.lost){
                count++;
            }
         }     
    }
    return count;
}

function NumberOfWinsToZero(prognosisArray){
    var count = 0;
    for (var i = 0; i<prognosisArray.length; i++){
         var prognosis = prognosisArray[i].toString();
         prognosis = NormaliseResult(prognosis);
         if (IsValid(prognosis)){
            var parsedPrognosis = ParseResult(prognosis);
            if (parsedPrognosis.scored !== parsedPrognosis.lost
            && (parsedPrognosis.scored === 0 || parsedPrognosis.lost === 0)){
                count++;
            }
         }     
    }
    return count;
}

function GoalDifference(scored, lost){
    return Math.abs(scored - lost);
}

function NumberOfMatchesWithProvidedGoalDifference(prognosisArray, testedGoalDifference){
    var count = 0;
    for (var i = 0; i<prognosisArray.length; i++){
         var prognosis = prognosisArray[i].toString();
         prognosis = NormaliseResult(prognosis);
         if (IsValid(prognosis)){
            var parsedPrognosis = ParseResult(prognosis);
            var goalDifference = GoalDifference(parsedPrognosis.scored, parsedPrognosis.lost);
            if (goalDifference === testedGoalDifference){
                count++;
            }
         }     
    }
    return count;
}

function NumberOfMatchesWithOneGoalDifference(prognosisArray){
    return NumberOfMatchesWithProvidedGoalDifference(prognosisArray, 1);
}

function NumberOfMatchesWithTwoGoalDifference(prognosisArray){
    return NumberOfMatchesWithProvidedGoalDifference(prognosisArray, 2);
}

function NumberOfMatchesWithMoreThenTwoGoalDifference(prognosisArray){
    var count = 0;
    for (var i = 0; i<prognosisArray.length; i++){
         var prognosis = prognosisArray[i].toString();
         prognosis = NormaliseResult(prognosis);
         if (IsValid(prognosis)){
            var parsedPrognosis = ParseResult(prognosis);
            var goalDifference = GoalDifference(parsedPrognosis.scored, parsedPrognosis.lost);
            if (goalDifference > 2){
                count++;
            }
         }     
    }
    return count;
}
