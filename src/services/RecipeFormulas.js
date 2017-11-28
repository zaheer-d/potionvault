
export function GetNicotine(baseStrength, targetStrength, totalVol) {
    return ((targetStrength / baseStrength) * totalVol).toFixed(2);
}

export function GetNicotineW(total) {
    return (total * 1.03).toFixed(2);
}

export function GetTotalBaseVgW(total){
    return (total * 1.26);
}

export function GetTotalBasePgW(total){
    return total * 1.03;
}

export function GetTotalBaseVgOrPg(totalVolume, ratio){
  return (ratio / 100) * totalVolume;
}

/**
 * @return {number}
 */
export function GetConcentratesW(total){
    console.log('ConcentrateW', (total) * 1.26);
    return (total) * 1.26;
}

/**
 * @return {number}
 */
export function GetConcentrates(perc, totalVolume){
    return (perc / 100) * totalVolume;
}


