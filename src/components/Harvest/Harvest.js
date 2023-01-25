import React from "react";
import PropTypes from "prop-types";

const Harvest = props => {
    return(
        <div>
            <p>Weight: {props.weight}</p>
            <p>HarvestedPlant: {props.harvestedPlant}</p>
            <p>HarvestDate: {props.HarvestDate.getDate()}/{props.HarvestDate.getMonth() + 1}/{props.HarvestDate.getFullYear()}</p>
            
        </div>
    );
};

Harvest.propTypes = {
    weight: PropTypes.string.isRequired,
    harvestedPlant: PropTypes.string.isRequired,
    HarvestDate: PropTypes.instanceOf(Date).isRequired
    
}

Harvest.defaultProps = {
    weight: "Harvest's weight",
    harvestedPlant: "harvestedPlant", 
    HarvestDate: new Date()
    
}

export default Harvest;