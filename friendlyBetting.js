'use strict';

function NormaliseResult (result){
    if (result===undefined) return undefined;
    return result.replace(/ /g,'').replace('-',':');
}

function IsValid(str) {
    if (str === undefined) return false;
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
    };
    return {
        type: type,
        scored: scored,
        lost: lost
    };
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
    };
    
    var parsedExact = ParseResult(exact);
    var parsedPrognosis = ParseResult(prognosis);
    if (parsedExact.type === parsedPrognosis.type){
        if (parsedExact.scored === parsedPrognosis.scored 
            && parsedExact.lost === parsedPrognosis.lost){
            return exactMatch;
        }else{
            if (parsedExact.scored === parsedPrognosis.scored 
            || parsedExact.lost === parsedPrognosis.lost){
                return halfExactMatch;
            }else{
                return looseMatch;
            }
        }
    }else{
        return noMatch;
    };
}

function GetWeightedPointsForPrognosis (exact, prognosis, weight){
    return weight * GetPointsForPrognosis(exact, prognosis);
}