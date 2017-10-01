
export function GetNicotine(baseStrength, targetStrength, totalVol) {
    console.log((targetStrength / baseStrength) * totalVol);
    console.log('T='+ targetStrength +' B='+baseStrength +' V='+totalVol);
    return ((targetStrength / baseStrength) * totalVol).toFixed(2);
}

export function GetConcentrates(perc, totalVolume){
    return (perc / 100) * totalVolume;
}


