import React from "react";
import PropTypes from "prop-types";

const Preserve = props => {
    return(
        <div>
            <p>{props.name}</p>
            <p>{props.description}</p>
            <p>{props.productionDate.getDate()}/{props.productionDate.getMonth() + 1}/{props.productionDate.getFullYear()}</p>
            <p>{props.expirationDate.getDate()}/{props.expirationDate.getMonth() + 1}/{props.expirationDate.getFullYear()}</p>
        </div>
    );
};

Preserve.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    productionDate: PropTypes.instanceOf(Date).isRequired,
    expirationDate: PropTypes.instanceOf(Date).isRequired
}

Preserve.defaultProps = {
    name: "Preserve's name",
    description: "Preserve's description",
    productionDate: new Date(),
    expirationDate: new Date()
}

export default Preserve;