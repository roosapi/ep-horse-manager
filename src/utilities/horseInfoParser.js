import * as typedefs from './typedefs';

// Receives an object from the form: {basic: TEXT, ...}
// Returns an object with relevant information extracted.
const parseHorseInfo = (horseData) => {
    const {basic} = horseData;

    // Take everything from "General data" to "Pedigree" (includes basic information, personality, conformation)
    const relevantData = sliceBetweenStr(basic,"General data","Pedigree")
    //console.log(relevantData)
    return extractBasicInfo(basic);
}

/**
 * Extracts a substring of dataStr.
 * @param {string} dataStr 
 * @param {string} startStr - Determines the start location for slice
 * @param {string} endSrt - Determines the end location for slice (exclusive)
 * @returns {string}
 */
const sliceBetweenStr = (dataStr,startStr,endSrt) => {
    // For most properties there is only one occurence, but height may repeat
    // since foals list both current height and the final adult height; in that case
    // we want to use the last occurence (final height)
    const startIdx = dataStr.lastIndexOf(startStr);
    const endIdx = dataStr.indexOf(endSrt,startIdx); // End should come after start
    return dataStr.slice(startIdx,endIdx);
}

// Parses basic info rows to value string
/**
 * Extracts the value basic info determined by keyStr:
 * The horse info should be in rows of form: "Info key: Info value \n"
 * @param {string} dataStr - String containing all the horse info.
 * @param {string} keyStr - Determines the info key and where to start slice.
 * @param {string} [endStr="\n"] - Determines where to end slice (exclusive).
 * @returns {string}
 */
const getInfoValue = (dataStr,keyStr,endStr="\n") => {
    return sliceBetweenStr(dataStr,keyStr,endStr).split(':')[1].trim();
};

/**
 * 
 * @param {string} dataString - A string containing all the basic horse information.
 * @returns @type {typedefs.Horse}
 */
const extractBasicInfo = (dataString) => {
    const extractHorseName = (nameStr) => {
        return (nameStr.includes("Colt") || nameStr.includes("Filly")) ? "" : nameStr;
    };
    const abbrBreed = (breedStr) => {

        // TODO this better eventually; maybe read map from file if makes sense?
        const breedMap = {
            'American Quarter Horse': 'AQH',
            'American Paint Horse': 'APH',
            'American Azteca': 'AZT',
            'Puro Sangue Lusitano': 'PSL',
            'Andalusian Horse': 'ANDA',
            'Falster Carriage Horse': 'FCH',
        };
        return (breedStr in breedMap) ? breedMap[breedStr] : breedStr;
    };
    const infos = {
        id: getInfoValue(dataString,"ID"),
        name: extractHorseName(getInfoValue(dataString,"Registered name")),
        sex: getInfoValue(dataString,"Sex").toLowerCase(),
        breed: abbrBreed(getInfoValue(dataString,"Breed:","[")),
        type: getInfoValue(dataString,"Type","type").toLowerCase(),
        height: getInfoValue(dataString,"eight:","(").split(" ")[0],
        born: getInfoValue(dataString,"Birthday").split(" ")[3],
    };

    console.log(infos)
    return infos;
};

export {parseHorseInfo};