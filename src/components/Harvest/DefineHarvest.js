import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHarvestAsync } from "./HarvestSlice";

const DefineHarvest = () => {
    const [weight, setWeight] = useState('');
    const [harvestedPlant, setHarvestedPlant] = useState('');
    const [harvestDate, setHarvestDate] = useState('');
    const [weightError, setWeightError] = useState({
        error: false,
        msg: ''
    });
    const [harvestedPlantError, setHarvestedPlantError] = useState({
        error: false,
        msg: ''
    });
    const [harvestDateError, setHarvestDateError] = useState({
        error: false,
        msg: ''
    });
    

    const dispatch = useDispatch();

    const checkErrorsOnSubmit = () => {
        if(!harvestDate) {
            setHarvestDateError({
                error: true,
                msg: 'Date of harvest is required'
            });
        }
        else {
            setHarvestDateError({
                error: false,
                msg: ''
            });
        }

        if(!weight) {
            setWeightError({
                error: true,
                msg: 'Weight of harvest is required'
            });
        }

        if(!harvestedPlant) {
            setHarvestedPlantError({
                error: true,
                msg: 'Type of harvested plant is required'
            });
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        if(!weightError.error && !harvestedPlantError.error && !harvestDateError.error) {
            dispatch(addHarvestAsync({
                weight: weight,
                harvestedPlant: harvestedPlant,
                harvestDate: harvestDate
            }));
        }
    }

    const handleWeightChange = (e) => {
        if(!e.target.value) {
            setWeightError({
                error: true,
                msg: 'Weight is required'
            });
        }
        else if(e.target.value.length < 1) {
            setWeightError({
                error: true,
                msg: 'Weight is too small'
            });
        }
        else if(e.target.value.length > 6) {
            setWeightError({
                error: true,
                msg: 'Weight is too large'
            });
        }
        else {
            setWeightError({
                error: false,
                msg: ''
            });
        }
        setWeight(e.target.value);
    }

    const handleHarvestedPlantChange = (e) => {
        if(!e.target.value) {
            setHarvestedPlantError({
                error: true,
                msg: 'Type of harvested plant is required'
            });
        }
        /*
        else if(e.target.value.length < 3) {
            setHarvestedPlantError({
                error: true,
                msg: 'Type of harvested plant is too short'
            });
        }
        else if(e.target.value.length > 50) {
            setHarvestedPlantError({
                error: true,
                msg: 'Type of harvested plant is too long'
            });
        }
        else {
            setHarvestedPlantError({
                error: false,
                msg: ''
            });
        }
        setHarvestedPlant(e.target.value);
        */  
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Weight: 
                    <input type="text" id="weight" placeholder="Weight" onChange={(event) => handleWeightChange(event)}/>
                </label><br/>
                {weightError.error && <p className="error">{weightError.msg}</p>}
                <label>
                    HarvestedPlant: 
                    <input type="text" id="harvestedPlant" placeholder="Harvetsted Plant" onChange={(event) => handleHarvestedPlantChange(event)}/>
                </label><br/>
                {harvestedPlantError.error && <p className="error">{harvestedPlantError.msg}</p>}
                <label>
                    Harvest Date: 
                    <input type="date" id="hravestDate" onChange={(event) => setHarvestDate(event.target.value)}/>
                </label><br/>
                {harvestDateError.error && <p className="error">{harvestDateError.msg}</p>}
                <button onClick={checkErrorsOnSubmit} type="submit">Add</button>
            </form>
        </div>
        );
}

export default DefineHarvest;
