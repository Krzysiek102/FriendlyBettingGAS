'use strict';

function NormaliseResult (result){
    return result.replace(/ /g,'').replace('-',':');
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
    if (exact === prognosis)
    {
        return exactMatch;
    }else{
        var exactType = GetResultType(exact);
        var prognosisType = GetResultType(prognosis);
        if (exactType === prognosisType){
            return looseMatch;
        }else{
            return noMatch;
        }
    }
}