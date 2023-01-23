import React, { useEffect } from "react";
import DefinePreserve from "./DefinePreserve";
import Preserve from "./Preserve";
import Weather from "../Weather/Weather";
import FutureWeather from "../FutureWeather/FutureWeather";
import { useSelector, useDispatch } from "react-redux";
import { getPreservesAsync } from "./preserveSlice";

const Preserves = () => {
    const dispatch = useDispatch();
    const preserves = useSelector((state) => state.preserves);

    useEffect(() => {
        dispatch(getPreservesAsync());
    }, [dispatch]);
    
    return(
        <div>
            <DefinePreserve/>
            <h2>List of Preserves</h2>
            {preserves.map((preserve, key) => {
                return <Preserve
                        key = {key}
                        name = {preserve.name}
                        description = {preserve.description}
                        productionDate = {new Date(preserve.dateOfProduction)}
                        expirationDate = {new Date(preserve.expirationDate)}/>   
            })}
            <Weather/>
            <FutureWeather/>
        </div>
    );
}

export default Preserves;