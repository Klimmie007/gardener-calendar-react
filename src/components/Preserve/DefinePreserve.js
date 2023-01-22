import axios from "axios";
import React, { Component, useState } from "react";
import PreserveModel from "../../models/PreserveModel";
import { useDispatch } from "react-redux";
import { addPreserveAsync } from "./preserveSlice";

const DefinePreserve = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateOfProduction, setDateOfProduction] = useState(new Date());
    const [expirationDate, setExpirationDate] = useState(new Date());

    const dispatch = useDispatch();

    /*onChange = (event) => {
        var name = event.target.id;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }*/

    /*addPreserve = () => {
        const {addPreserve} = this.props;
        addPreserve(this.state);
    }*/

    const handleSubmit = event => {
        event.preventDefault();
       
        //const preserve = new PreserveModel(name, description, new Date(dateOfProduction), new Date(expirationDate));
        //console.log(preserve);
        dispatch(addPreserveAsync({
            name: name,
            description: description,
            dateOfProduction: dateOfProduction,
            expirationDate: expirationDate
        }));
        /*axios.post('http://localhost:3000/api/preserves', preserve.toJSON())
        .then(res => {
            console.log(res);
            console.log(res.data);
        });*/
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: 
                    <input type="text" id="name" onChange={(event) => setName(event.target.value)}/>
                </label><br/>
                <label>
                    Description: 
                    <input type="text" id="description" onChange={(event) => setDescription(event.target.value)}/>
                </label><br/>
                <label>
                    Date of production: 
                    <input type="date" id="dateOfProduction" onChange={(event) => setDateOfProduction(event.target.value)}/>
                </label><br/>
                <label>
                    Expiration date: 
                    <input type="date" id="expirationDate" onChange={(event) => setExpirationDate(event.target.value)}/>
                </label><br/>
                <button type="submit">Add</button>
            </form>
        </div>
        );
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