export class Horse {

    // BASICS
    id; // int
    name = "foal doe"; // String
    gender = ""; // String; enum?
    breed = ""; // String
    type; // enum
    height = 0; // int
    bdate; // int ; the birth year

    // PERSONALITY: all int -3 to 3
    personality; // = {
            //temperament;
            //charisma;
            //attspan;
            //mind;
            //handle;
            //nerves;
            //intelligence;
            //}
    

    // CONFORMATION: all int -3 to 3
    // also an object containing the gollowing keys:
    head;
    baseneck;
    neck;
    back;
    // alternatively: legs two arrays of 3 to group like in text?
    front_camped;
    front_base;
    front_toes;
    rear_camped;
    rear_base;
    rear_toes;

    // POTENTIAL: an array of discpline objects? array 
    // of key-value mappings?
    genetic_potential;

    // COLOURS: object: values are String for each testable gene, 
    // bool for sty, rab, etc
    colours;

    // PEDIGREE (secondary)
    // sire & dam ids
    // breed percentages


    constructor(initialiser) { //initialiser object
        if (!initialiser.id) return;
        this.id = initialiser.id;
        if (initialiser.name) this.name = initialiser.name;
        if (initialiser.breed) this.breed = initialiser.breed;
        if (initialiser.gender) this.gender = initialiser.gender;
    }
}