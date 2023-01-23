import React from "react";
import PropTypes from "prop-types";

const GardenPatch = props => {
    return(
        <div>
            <p>Name: {props.name}</p>
            <p>Type: {props.type}</p>
            <p>Amount: {props.amount}</p>  
        </div>
    );
};

GardenPatch.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
}

GardenPatch.defaultProps = {
    name: "Garden patch's name",
    type: "Garden patch's type",
    amount: 1
}

export default GardenPatch;