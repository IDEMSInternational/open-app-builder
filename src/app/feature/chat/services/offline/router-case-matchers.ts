import { RapidProFlowExport } from './rapid-pro-export.model';

export function matchesCase(routerCase: RapidProFlowExport.RouterCase, operand: string) {
    switch (routerCase.type) {
        case "has_only_phrase": return routerCase.arguments[0].toLowerCase() === operand.toLowerCase();
        case "has_any_word": return matchHasAnyWordCase(routerCase, operand);
        case "has_number_between": return matchHasNumberBetweenCase(routerCase, operand);
        case "has_number_gt": return matchHasNumberGreaterThanCase(routerCase, operand);
        case "has_number_lt": return matchHasNumberLessThanCase(routerCase, operand);
        default: return false;
    }
}

export function matchHasNumberGreaterThanCase(routerCase: RapidProFlowExport.RouterCase, operand: string): boolean {
    let min = Number.parseFloat(routerCase.arguments[0]);
    let inputNumber = Number.parseFloat(operand);
    return (min !== NaN && inputNumber !== NaN && inputNumber > min);
}

export function matchHasNumberLessThanCase(routerCase: RapidProFlowExport.RouterCase, operand: string): boolean {
    let max = Number.parseFloat(routerCase.arguments[0]);
    let inputNumber = Number.parseFloat(operand);
    return (max !== NaN && inputNumber !== NaN && inputNumber < max);
}

export function matchHasNumberBetweenCase(routerCase: RapidProFlowExport.RouterCase, operand: string): boolean {
    let rangeNumbers = routerCase.arguments.map((arg) => Number.parseFloat(arg)).sort((a, b) => a - b);
    let inputNumber = Number.parseFloat(operand);
    if (rangeNumbers[0] !== NaN && rangeNumbers[1] !== NaN && inputNumber !== NaN) {
        if (inputNumber > rangeNumbers[0] && inputNumber < rangeNumbers[1]) {
            return true;
        }
    }
    return false;
}

export function matchHasAnyWordCase(routerCase: RapidProFlowExport.RouterCase, operand: string): boolean {
    let matchStrings = [];
    for (let arg of routerCase.arguments) {
        matchStrings = matchStrings.concat(arg.toLowerCase().split(" "));
    }
    for (let matchString of matchStrings) {
        if (operand.toLowerCase() === matchString) {
            return true;
        }
    }
}