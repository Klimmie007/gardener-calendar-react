class HarvestModel {
    constructor(weight, harvestedPlant, harvestDate) {
        this.weight = weight;
        this.harvestedPlant = harvestedPlant;
        this.harvestDate = harvestDate;
        
    };

    toJSON() {
        return {weight: this.weight, harvestedPlant: this.harvestedPlant, harvestDate: this.harvestDate};
    }
}

export default HarvestModel;