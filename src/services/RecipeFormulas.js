
export function GetNicotine(baseStrength, targetStrength, totalVol) {
    return ((targetStrength / baseStrength) * totalVol).toFixed(2);
}

export function GetTotalBaseVgOrPg(totalVolume, ratio){
  return (ratio / 100) * totalVolume;
}


export function GetConcentrates(perc, totalVolume){
    return (perc / 100) * totalVolume;
}


