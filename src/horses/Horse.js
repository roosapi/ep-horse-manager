export class Horse {
    id; // int
    name = "foal doe"; // String
    breed = ""; // String; eventually enum: https://www.geeksforgeeks.org/javascript/enums-in-javascript/
    gender = ""; // String; enum?

    constructor(initialiser) { //initialiser object
        if (!initialiser.id) return;
        this.id = initialiser.id;
        if (initialiser.name) this.name = initialiser.name;
        if (initialiser.breed) this.breed = initialiser.breed;
        if (initialiser.gender) this.gender = initialiser.gender;
    }
}