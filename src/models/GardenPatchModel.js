class GardenPatchModel {
    constructor(name, type, amount) {
        this.name = name;
        this.type = type;
        this.amount = amount;
    }

    toJSON() {
        return {name: this.name, type: this.type, amount: this.amount};
    }
}

export default GardenPatchModel;