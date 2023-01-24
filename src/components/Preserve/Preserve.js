import React from "react";
import PropTypes from "prop-types";

const Preserve = props => {
    return(
        <div>
            <hr></hr>
            <p>Name: {props.name}</p>
            <p>Description: {props.description}</p>
            <p>Date of production: {props.dateOfProduction.getDate()}/{props.productionDate.getMonth() + 1}/{props.productionDate.getFullYear()}</p>
            <p>Expiration date: {props.expirationDate.getDate()}/{props.expirationDate.getMonth() + 1}/{props.expirationDate.getFullYear()}</p>
            <hr></hr>
        </div>
    );
};

Preserve.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateOfProduction: PropTypes.instanceOf(Date).isRequired,
    expirationDate: PropTypes.instanceOf(Date).isRequired
}

Preserve.defaultProps = {
    name: "Preserve's name",
    description: "Preserve's description",
    dateOfProduction: new Date(),
    expirationDate: new Date()
}

export default Preserve;