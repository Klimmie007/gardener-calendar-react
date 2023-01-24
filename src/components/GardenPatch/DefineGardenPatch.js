import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addGardenPatchAsync } from "./gardenPatchSlice";
import './DefineGardenPatch.css'

const options = [
    { value: 'Plant', label: 'Plant' },
    { value: 'Bush', label: 'Bush' },
    { value: 'Tree', label: 'Tree' }
];

const DefineGardenPatch = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(1);
    const [nameError, setNameError] = useState({
        error: false,
        msg: ''
    });
    const [amountError, setAmountError] = useState({
        error: false,
        msg: ''
    });
    const [typeError, setTypeError] = useState({
        error: false,
        msg: ''
    });

    const dispatch = useDispatch();

    const checkErrorsOnSubmit = () => {
        if(!type) {
            setTypeError( {
                error: true,
                msg: 'Select type'
            });
        }
        else {
            setTypeError( {
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
    }

    const handleSubmit = event => {
        event.preventDefault();

        if(!typeError.error && !nameError.error && !amountError.error) {
            dispatch(addGardenPatchAsync({
                name: name,
                type: type,
                amount: amount
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

    const handleAmountChange = (e) => {
        if(e.target.value > 100) {
            setAmountError({
                error: true,
                msg: 'Max value is 100'
            });
        }
        else if(e.target.value < 1) {
            setAmountError({
                error: true,
                msg: 'Min value is 1'
            });
        }
        else {
            setAmountError({
                error: false,
                msg: ''
            });
        }
        setAmount(e.target.value);
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
                    Type:
                    <select id="type" value={type} onChange={(event) => setType(event.target.value)}>
                        <option disabled={true} value="">Select type</option>
                        {options.map((option, key) => {
                            return <option key={key} value={option.value}>{option.label}</option>
                        })}
                    </select>
                </label><br/>
                {typeError.error && <p className="error">{typeError.msg}</p>}
                <label>
                    Amount:
                    <input type="number" id="amount" value={amount} min="1" onChange={(event) => handleAmountChange(event)}/>
                </label><br/>
                {amountError.error && <p className="error">{amountError.msg}</p>}
                <button onClick={checkErrorsOnSubmit} type="submit">Add</button>
            </form>
        </div>
    );
}

export default DefineGardenPatch;