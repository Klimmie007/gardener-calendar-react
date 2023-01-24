import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPreserveAsync } from "./preserveSlice";

const DefinePreserve = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateOfProduction, setDateOfProduction] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [nameError, setNameError] = useState({
        error: false,
        msg: ''
    });
    const [descriptionError, setDescriptionError] = useState({
        error: false,
        msg: ''
    });
    const [dateOfProductionError, setDateOfProductionError] = useState({
        error: false,
        msg: ''
    });
    const [expirationDateError, setExpirationDateError] = useState({
        error: false,
        msg: ''
    });

    const dispatch = useDispatch();

    const checkErrorsOnSubmit = () => {
        if(!dateOfProduction) {
            setDateOfProductionError({
                error: true,
                msg: 'Date of production is required'
            });
        }
        else {
            setDateOfProductionError({
                error: false,
                msg: ''
            });
        }

        if(!expirationDate) {
            setExpirationDateError({
                error: true,
                msg: 'Expiration date is required'
            });
        }
        else {
            setExpirationDateError({
                error: false,
                msg: ''
            });
        }

        if(!name) {
            setNameError({
                error: true,
                msg: 'Name is required'
            });
        }

        if(!description) {
            setDescriptionError({
                error: true,
                msg: 'Description is required'
            });
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        if(!nameError.error && !descriptionError.error && !dateOfProductionError.error && !expirationDate.error) {
            dispatch(addPreserveAsync({
                name: name,
                description: description,
                dateOfProduction: dateOfProduction,
                expirationDate: expirationDate
            }));
        }
    }

    const handleNameChange = (e) => {
        if(!e.target.value) {
            setNameError({
                error: true,
                msg: 'Name is required'
            });
        }
        else if(e.target.value.length < 3) {
            setNameError({
                error: true,
                msg: 'Name is too short'
            });
        }
        else if(e.target.value.length > 50) {
            setNameError({
                error: true,
                msg: 'Name is too long'
            });
        }
        else {
            setNameError({
                error: false,
                msg: ''
            });
        }
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        if(!e.target.value) {
            setDescriptionError({
                error: true,
                msg: 'Description is required'
            });
        }
        else if(e.target.value.length < 3) {
            setDescriptionError({
                error: true,
                msg: 'Description is too short'
            });
        }
        else if(e.target.value.length > 250) {
            setDescriptionError({
                error: true,
                msg: 'Description is too long'
            });
        }
        else {
            setDescriptionError({
                error: false,
                msg: ''
            });
        }
        setDescription(e.target.value);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: 
                    <input type="text" id="name" placeholder="Name" onChange={(event) => handleNameChange(event)}/>
                </label><br/>
                {nameError.error && <p className="error">{nameError.msg}</p>}
                <label>
                    Description: 
                    <input type="text" id="description" placeholder="Description" onChange={(event) => handleDescriptionChange(event)}/>
                </label><br/>
                {descriptionError.error && <p className="error">{descriptionError.msg}</p>}
                <label>
                    Date of production: 
                    <input type="date" id="dateOfProduction" onChange={(event) => setDateOfProduction(event.target.value)}/>
                </label><br/>
                {dateOfProductionError.error && <p className="error">{dateOfProductionError.msg}</p>}
                <label>
                    Expiration date: 
                    <input type="date" id="expirationDate" onChange={(event) => setExpirationDate(event.target.value)}/>
                </label><br/>
                {expirationDateError.error && <p className="error">{expirationDateError.msg}</p>}
                <button onClick={checkErrorsOnSubmit} type="submit">Add</button>
            </form>
        </div>
        );
}

export default DefinePreserve;