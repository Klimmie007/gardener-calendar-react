import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefineGardenPatch from "./DefineGardenPatch";
import GardenPatch from "./GardenPatch";
import { getGardenPatchesAsync } from "./gardenPatchSlice";

const GardenPatches = () => {
    const gardenPatches = useSelector((state) => state.gardenPatches);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGardenPatchesAsync());
    }, [dispatch]);

    return(
        <div>
            <DefineGardenPatch/>
            <h2>List of Garden patches</h2>
            {gardenPatches.map((gardenPatch, key) => {
                return <GardenPatch
                        key = {key}
                        name = {gardenPatch.name}
                        type = {gardenPatch.type}
                        amount = {gardenPatch.amount}
                        />
            })}
        </div>
    );
}

export default GardenPatches;