import React, { useEffect } from "react";
import DefineHarvest from "./DefineHarvest";
import Harvest from "./Harvest";
import Weather from "../Weather/Weather";
import FutureWeather from "../FutureWeather/FutureWeather";
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
            <Weather/>
            <FutureWeather/>
        </div>
    );
}

export default Harvests;