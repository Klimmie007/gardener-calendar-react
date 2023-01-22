import axios from "axios";
import React, { Component } from "react";
import PreserveModel from "../models/PreserveModel";

class DefinePreserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            productionDate: new Date(),
            expiratinDate: new Date()
        };
    }

    onChange = (event) => {
        var name = event.target.id;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    /*addPreserve = () => {
        const {addPreserve} = this.props;
        addPreserve(this.state);
    }*/

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.name);
        console.log(this.state.description);
        console.log(new Date(this.state.productionDate));
        console.log(new Date(this.state.expiratinDate));
        const preserve = new PreserveModel(this.state.name, this.state.description, new Date(this.state.productionDate), new Date(this.state.expiratinDate));
        console.log(preserve);
        axios.post('http://localhost:3000/api/preserves', preserve.toJSON())
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: 
                        <input type="text" id="name" onChange={this.onChange}/>
                    </label><br/>
                    <label>
                        Description: 
                        <input type="text" id="description" onChange={this.onChange}/>
                    </label><br/>
                    <label>
                        Date of production: 
                        <input type="date" id="productionDate" onChange={this.onChange}/>
                    </label><br/>
                    <label>
                        Expiration date: 
                        <input type="date" id="expiratinDate" onChange={this.onChange}/>
                    </label><br/>
                    <button type="submit" onClick={this.addPreserve}>Add</button>
                </form>
            </div>
        );
    }
}

export default DefinePreserve;

            /*<div>
                <h1>Define preserve</h1>
                <div>
                    Name: 
                    <input type="text" id="name" onChange={this.onChange}/>   
                </div>
                <div>
                    Description: <br/>
                    <input type="text" id="description" onChange={this.onChange}/>
                </div>
                <div>
                    Date of production: 
                    <input type="date" id="productionDate" onChange={this.onChange}/>
                </div>
                <div>
                    Expiration date: 
                    <input type="date" id="expiratinDate" onChange={this.onChange}/>
                </div>
                <div>
                    <button onClick={this.addPreserve}>
                        Add
                    </button>
                </div>
            </div>*/