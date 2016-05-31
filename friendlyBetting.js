'use strict';

function NormaliseResult (result){
    if (result===undefined) return undefined;
    return result.replace(/ /g,'').replace('-',':');
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function GetResultType (result){
    var resultSplitted = result.split(":");
    var scored = resultSplitted[0];
    var lost = resultSplitted[1]; 
    if (scored > lost){
        return 1;
    }else if (scored === lost){
        return 0;
    }else {
        return 2;
    }
}

function GetPointsForPrognosis (exact, prognosis, exactMatch, looseMatch, noMatch){
    exact = NormaliseResult(exact);
    prognosis = NormaliseResult(prognosis);
    if (isBlank(exact) || isBlank(prognosis)){
        return noMatch;
    };
    if (exact === prognosis)
    {
        return exactMatch;
    };
    var exactType = GetResultType(exact);
    var prognosisType = GetResultType(prognosis);
    if (exactType === prognosisType){
        return looseMatch;
    }else{
        return noMatch;
    }
}