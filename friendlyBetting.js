'use strict';

function NormaliseResult (result){
    return result.replace(/ /g,'').replace('-',':');
}

function GetPointsForMatch (result, prognosis, pointsForExactResult, pointsForLooseResult){
    throw new Error("Not implemented");
}