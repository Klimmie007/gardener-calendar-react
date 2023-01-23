import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPreserveAsync } from "./preserveSlice";

const DefinePreserve = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateOfProduction, setDateOfProduction] = useState(new Date());
    const [expirationDate, setExpirationDate] = useState(new Date());

    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(addPreserveAsync({
            name: name,
            description: description,
            dateOfProduction: dateOfProduction,
            expirationDate: expirationDate
        }));
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