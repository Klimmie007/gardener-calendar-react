import React, { Component } from "react";
import Preserve from "./Preserve";

/*const Preserves = () => {
    return(
        <div>
            <h2>List of Preserves</h2>
            <Preserve name="xdd"/>
            <Preserve/>
            <Preserve/>
            <Preserve/>
        </div>
    );
};*/

class Preserves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
       fetch(''); 
    }

    render() {
        return(
            <div>
                <h2>List of Preserves</h2>
                <Preserve/>
                <Preserve/>
                <Preserve/>
                <Preserve/>
            </div>
        );
    }
}

export default Preserves;