import * as typedefs from './typedefs';
import * as Constants from './constants'

const STATMAPS = {
    perso: [
        { labels: ['very good'], value: 3 },
        { labels: ['good','much'], value: 2 },
        { labels: ['satisfying'], value: 1 },
        { labels: ['average'], value: 0 },
        { labels: ['somewhat poor'], value: -1 },
        { labels: ['very poor'], value: -3 },
        { labels: ['poor'], value: -2 },
    ],

    temp: [
        { labels: ['very high'], value: 3 },
        { labels: ['moderately high'], value: 1 },
        { labels: ['high'], value: 2 },
        { labels: ['good'], value: 0 },
        { labels: ['moderately low'], value: -1 },
        { labels: ['very low'], value: -3 },
        { labels: ['low'], value: -2 },
    ],
    confo: [
        { labels: ['way too large', 'way too high', 'way too long'], value: 3 },
        { labels: ['slightly too large', 'slightly too high', 'slightly too long'], value: 1 },
        { labels: ['too large', 'too high', 'too long'], value: 2 },
        { labels: ['slightly too small', 'slightly too low', 'slightly too short'], value: -1 },
        { labels: ['way too small', 'way too low', 'way too short'], value: -3 },
        { labels: ['too small', 'too low', 'too short'], value: -2 },
    ],

    legs: {
        camp: [
            { labels: ['very camped-out'], value: 3 },
            { labels: ['slightly camped-out'], value: 1 },
            { labels: ['camped-out'], value: 2 },

            { labels: ['very camped-in'], value: -3 },
            { labels: ['slightly camped-in'], value: -1 },
            { labels: ['camped-in'], value: -2 },
        ],
        base: [
            { labels: ['very base-wide'], value: 3 },
            { labels: ['slightly base-wide'], value: 1 },
            { labels: ['base-wide'], value: 2 },
            { labels: ['slightly base-narrow'], value: -1 },
            { labels: ['very base-narrow'], value: -3 },
            { labels: ['base-narrow'], value: -2 },
        ],
        toes: [
            { labels: ['very toed-out'], value: 3 },
            { labels: ['slightly toed-out'], value: 1 },
            { labels: ['toed-out'], value: 2 },
            { labels: ['slightly toed-in'], value: -1 },
            { labels: ['very toed-in'], value: -3 },
            { labels: ['toed-in'], value: -2 },
        ],
    }
}

// Receives an object from the form: {basic: TEXT, ...}
// Returns an object with relevant information extracted.
const parseHorseInfo = (horseData) => {
    const {basic,skills} = horseData;

    const basicData = extractBasicInfo(basic);
    const statsData = extractStatsData(basic);
    const skillsData = extractSkillsData(basicData.id,skills);

    return {'basic':basicData,'stats':{horse_id: basicData.id,...statsData},'skills':skillsData}
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

/**
 * 
 * @param {string} dataString - a string containing basic horse information from the "passport" page
 * @returns {object} - an object containing personality and conformation transformed to int values in range [-3,3]
 */
const extractStatsData = (dataString) => {
    const persoRows = sliceBetweenStr(
                            dataString,
                            'Personality [go to library]',
                            'Conformation [go to library]')
                            .split('\n')
                            .filter((row) => row.length > 1)
                            .slice(1);
    const persoValues = Object.fromEntries(
        persoRows.map((row, idx) => [
            Constants.persoStats[idx],
            getStatAsInt(row, idx === 0 ? 'temp' : 'perso')[0],
        ])
    );
    const confoRows = sliceBetweenStr(
                            dataString,
                            'Conformation [go to library]',
                            'Pedigree')
                            .split('\n')
                            .filter((row) => row.length > 1)
                            .slice(1);

    const confoValues = Object.fromEntries(
        confoRows.slice(0,4).map((row,idx) => [
            Constants.confoStats[idx],
            getStatAsInt(row, 'confo')[0]
        ])
    );
    const [f_camp, f_base, f_toe] = getStatAsInt(confoRows[4],'legs');
    const [b_camp, b_base, b_toe] = getStatAsInt(confoRows[5],'legs');

    const statsValues = {
        ...persoValues,
        ...confoValues,
        f_camp,
        f_base,
        f_toe,
        b_camp,
        b_base,
        b_toe,
    };

    return statsValues;
};

/**
 * 
 * @param {string} statString - the string to convert to int value
 * @param {string} useMap - which of the STATMAPS to use for the mapping: 'perso', 'temp', 'confo', or 'legs'
 * @returns {Array} - An array of int values matching to the stat description in statString
 */
const getStatAsInt = (statString, useMap = 'perso') => {
    const matchStatValue = (statString, rules, defaultValue=null) => {
        for (const { labels, value } of rules) {
            if (labels.some(label => statString.includes(label))) {
            return value;
            }
        }
        return defaultValue;
    };

    if (!statString) return null;

    const noMatchValue = (useMap === 'confo' || useMap === 'legs') ? 0 : null;

    if (useMap === 'legs') {
        const { camp, base, toes } = STATMAPS.legs;
        return [
        matchStatValue(statString, camp,noMatchValue),
        matchStatValue(statString, base,noMatchValue),
        matchStatValue(statString, toes,noMatchValue),
        ];
    }

    return [matchStatValue(statString, STATMAPS[useMap], noMatchValue)];
};


/**
 * 
 * @param {int} horseId 
 * @param {string} skillsString  - a string containing horse discipline skills information from the "training" page
 * @returns {Array} - an array of discipline objects that contain the skills for one discpline each
 */
const extractSkillsData = (horseId,skillsString) => {
    const baseDiscps = new Set(Constants.disciplineMap.keys()).difference(new Set(Constants.combiDisciplinesMap.keys()))
    const discpStrings = Array.from(baseDiscps).concat(['Legal Notice']); // Include 'Legal Notice' only as an end string for logging
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