import * as typedefs from './typedefs';
import * as Constants from './constants'

// Receives an object from the form: {basic: TEXT, ...}
// Returns an object with relevant information extracted.
const parseHorseInfo = (horseData) => {
    const {basic,skills} = horseData;

    const basicData = extractBasicInfo(basic);
    const skillsData = extractSkillsData(basicData.id,skills);

    return {'basic':basicData,'skills':skillsData}
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

const extractSkillsData = (horseId,skillsString) => {
    const discpStrings = [...Constants.disciplineMap.keys()].concat(['Legal Notice']); // Include 'Legal Notice' only as an end string for logging
    const maxIdx = discpStrings.length -1;
    let discpInfos = [];
    for (let i=0; i < maxIdx; i++) {
        
        const discp = discpStrings[i];
        let discpInfo = {'horse_id':horseId,'discipline':discp};
        // The discipline endurance has a sub-skill called endurance, so make sure to cut at "training for discipline"
        const discpStr = sliceBetweenStr(skillsString,'training for '+discp,discpStrings[i+1]).slice('Basic training');
        const skillRows = discpStr.trim().split('\n');
 
        // Depending on the width of the horse page when it is copied,
        // the layout of the skills data is differrent.
        // TODO write nicer
        if (skillRows.length == 7) {
            // We take last 5 rows: those are the skills in format:
            // "current / total 	skillname" where we want the 'total'
            for (let skillIdx = 2;skillIdx < 7;skillIdx++) {
                const skillRow = skillRows[skillIdx].trim();
                const skillVal = skillRow.split(' ')[2];
                discpInfo['skill'+(skillIdx-1)] = skillVal;
            }
        } else {
            // We take rows 4,6,8,10,12 which only inlcude the 'current / total ' numbers
            let rowIdx = [4,6,8,10,12];
            for (let skillIdx = 0;skillIdx < 5;skillIdx++) {
                const skillRow = skillRows[rowIdx[skillIdx]].trim();
                const skillVal = skillRow.split(' ')[2];
                discpInfo['skill'+(skillIdx+1)] = skillVal;
            }
        }
        discpInfos.push(discpInfo);
    }
    return discpInfos;
};

export {parseHorseInfo};