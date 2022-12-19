import React, { Component } from "react";
import DefinePreserve from "./DefinePreserve";
import Preserve from "./Preserve";
import PreserveModel from "../models/PreserveModel";
import Weather from "./Weather/Weather";

class Preserves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preserveList: [
                /*{
                    name: "name1",
                    description: "desc1",
                    productionDate: new Date(),
                    expirationDate: new Date()
                },
                {
                    name: "name2",
                    description: "desc2",
                    productionDate: new Date(),
                    expirationDate: new Date()
                },
                {
                    name: "name3",
                    description: "desc3",
                    productionDate: new Date(),
                    expirationDate: new Date()
                }*/
                new PreserveModel("name1", "desc1", new Date(), new Date()),
                new PreserveModel("name2", "desc2", new Date(), new Date()),
                new PreserveModel("name3", "desc3", new Date(), new Date()),
            ]
        };
        //this.addPreserve = this.addPreserve.bind(this);
    }

    addPreserve = (preserve) => {
        this.setState(state => {
            var list = state.preserveList;
            let newPreserve = new PreserveModel(preserve.name, preserve.description, new Date(preserve.productionDate), new Date(preserve.expiratinDate));
            /*list.push({
                name: preserve.name,
                description: preserve.description,
                productionDate: new Date(preserve.productionDate),
                expirationDate: new Date(preserve.expiratinDate)
            });*/
            list.push(newPreserve);
            return {preserveList: list};
        })
    }

    render() {
        const {preserveList} = this.state;
        return(
            <div>
                <h2>List of Preserves</h2>
                {preserveList.map((preserve, key) => {
                    return <Preserve
                            key = {key}
                            name = {preserve.name}
                            description = {preserve.description}
                            productionDate = {preserve.productionDate}
                            expirationDate = {preserve.expirationDate}/>   
                })}
                <DefinePreserve addPreserve={this.addPreserve}/>
                <Weather/>
            </div>
        );
    }
}

export default Preserves;