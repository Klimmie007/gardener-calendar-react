class PreserveModel {
    constructor(name, description, productonDate, expirationDate) {
        this.name = name;
        this.description = description;
        this.dateOfProduction = productonDate;
        this.expirationDate = expirationDate;
    };

    toJSON() {
        return {name: this.name, description: this.description, dateOfProduction: this.dateOfProduction, expirationDate: this.expirationDate};
    }
}

export default PreserveModel;