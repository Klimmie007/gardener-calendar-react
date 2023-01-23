import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addGardenPatchAsync } from "./gardenPatchSlice";
import Select from 'react-select'

const options = [
    { value: 'Plant', label: 'Plant' },
    { value: 'Bush', label: 'Bush' },
    { value: 'Tree', label: 'Tree' }
];

const DefineGardenPatch = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(1);

    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(addGardenPatchAsync({
            name: name,
            type: type,
            amount: amount
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
                    Type:
                    <select id="type" value={type} onChange={(event) => setType(event.target.value)}>
                        <option disabled={true} value="">--Select type--</option>
                        {options.map((option, key) => {
                            return <option key={key} value={option.value}>{option.label}</option>
                        })}
                    </select>
                </label><br/>
                <label>
                    Amount:
                    <input type="number" id="amount" onChange={(event) => setAmount(event.target.value)}/>
                </label><br/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default DefineGardenPatch;