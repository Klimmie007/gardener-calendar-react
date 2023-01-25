import React, { useEffect } from "react";
import DefineHarvest from "./DefineHarvest";
import Harvest from "./Harvest";
import { useSelector, useDispatch } from "react-redux";
import { getHarvestsAsync } from "./HarvestSlice";

const Harvests = () => {
    const dispatch = useDispatch();
    const harvests = useSelector((state) => state.harvests);

    useEffect(() => {
        dispatch(getHarvestsAsync());
    }, [dispatch]);
    
    return(
        <div>
            <DefineHarvest/>
            <h2>List of Harvests</h2>
            {harvests.map((harvest, key) => {
                return <Harvest
                        key = {key}
                        weight = {harvest.weight}
                        harvestedPlant = {harvest.description}
                        harvestDate = {new Date(harvest.dateOfProduction)}/>   
            })}
        </div>
    );
}

export default Harvests;