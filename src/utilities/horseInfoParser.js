import { get } from "node:http";

// TODO finish input data handling: update horse model, create enums for the fields needed, populate database based on the parsed data

// Receives an object from the form: {basic: TEXT, ...}
const parseHorseInfo = (horseData) => {
    const {basic} = horseData;

    // Take everything from "General data" to "Pedigree"
    const relevantData = sliceBetweenStr(basic,"General data","Pedigree")
    console.log(relevantData)
    extractBasicInfo(basic)
}

// Return string starting from 'startStr' and ending to 'endStr' (exclusive)
const sliceBetweenStr = (dataStr,startStr,endSrt) => {
    // For most properties there is only one occurence, but height may repeat
    // since foals list both current height and the final adult height; in that case
    // we want to use the last occurence (final height)
    const startIdx = dataStr.lastIndexOf(startStr);
    const endIdx = dataStr.indexOf(endSrt,startIdx); // End should come after start
    return dataStr.slice(startIdx,endIdx);
}

// Parses basic info rows to value string
const getInfoRow = (dataStr,keyStr,endStr="\n") => {
    return sliceBetweenStr(dataStr,keyStr,endStr).split(':')[1].trim()
}

/*         
    id     INT PRIMARY KEY, 
    name   TEXT, 
    sex    INT, (enum)
    breed  TEXT, 
    type   TEXT, (enum)
    height INT,
    born   INT, (year)
    sire   INT,
    dam    INT 
*/
const extractBasicInfo = (dataString) => {
    const infos = {
        id: getInfoRow(dataString,"ID"),
        name: getInfoRow(dataString,"Registered name"),
        // TODO map to enum
        sex: getInfoRow(dataString,"Sex"),
        // TODO map to abbreviations
        breed: getInfoRow(dataString,"Breed:","["),
        // TODO map to enum
        type: getInfoRow(dataString,"Type","type"),
        height: getInfoRow(dataString,"eight:","(").split(" ")[0],
        born: getInfoRow(dataString,"Birthday").split(" ")[3],
    }

    console.log(infos)
}

export {parseHorseInfo};