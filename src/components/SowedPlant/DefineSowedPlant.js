import { createAction } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Component, useEffect, useState } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { store } from "../Basic/store"
import { getGardenPatchesAsync } from "../GardenPatch/gardenPatchSlice";
import PropTypes from "prop-types"
import GardenPatch from "../GardenPatch/GardenPatch";
import SmartReduxForm from "../Basic/smartForm";
import Plant from "../Plant/Plant";
import DropdownBox from "../Basic/DropdownBox";

class DefineSowedPlant extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            valid: false
        }
        store.dispatch({type: "GET_PATCHES"})
        store.dispatch({type: "GET_PLANTS"})
    }

    componentDidMount()
    {
        store.subscribe(() => this.forceUpdate())
    }

    countFree(Patch)
    {
        let free = Patch.amount
        store.getState().sowedPlants.sowedPlants.forEach((element) => {
            if(element.gardenPatchID._id == Patch._id)
            {
                free--
            }
        })
        return free
    }

    setPatch(id)
    {
        store.getState().sowedPlants.patches.forEach((element) => {
            if(element._id == id)
            {
                console.log(element )
                store.dispatch({type: "SET_PATCH", patchSelected: element})
                let plants = []
                store.getState().plants.plants.forEach((nestedElement) => {
                    console.log(nestedElement)
                    if(element.type == nestedElement.type)
                    {
                        plants.push(nestedElement)
                    }
                })
                console.log(plants)
                store.dispatch({type: "SET_AVAILABLE", plants: plants})
            }
        })
    }

    setPlant(id)
    {
        store.getState().sowedPlants.plantsAvailable.forEach((element) => {
            if(element._id == id)
            {
                console.log(element)
                store.dispatch({type: "SET_PLANT", plantSelected: element})
            }
        })
    }
    
    render()
    {
        let patch = store.getState().sowedPlants.patchSelected
        console.log(patch)
        let free = this.countFree(patch)
        let plant = store.getState().sowedPlants.plantSelected
        console.log(plant)
        return(<form onSubmit={(e) => {e.preventDefault(); store.dispatch({type: "SEND_TO_BACKEND"})}}>
            <DropdownBox callback={(val) => this.setPatch(val)} title="Patch" value={patch._id || "" } values={store.getState().sowedPlants.patches} valAccessor="_id" labelAccessor="name"/><br/>
            {patch.name != null ? 
            <>

                <GardenPatch name={patch.name} type={patch.type} amount={free}/>
                {free <=  0 ? <b>"This patch is fully occupied"</b> : <>
                <DropdownBox callback={(val) => this.setPlant(val)} title="Plant" value={plant._id || ""} values={store.getState().sowedPlants.plantsAvailable} valAccessor="_id" labelAccessor="name"/><br/>
                </>}
                
                
                {plant.name != null && free > 0 ? <>
                    <Plant name={plant.name} type={plant.type}
                    sowingStart={plant.sowingSeasonStart} sowingEnd={plant.sowingSeasonEnd} 
                    expectedYield={plant.expectedYieldInkg} yieldEnd={plant.yieldSeasonEnd}
                    yieldStart={plant.yieldSeasonStart} minVeg={plant.minVegetationCycleInDays}
                    maxVeg={plant.maxVegetationCycleInDays}/>
                    <SmartReduxForm name="Sow_Date" dispatch="SET_SOW_DATE" reducer="sowedPlants" type="date"/>
                    <input type="submit" value="Submit"/>
                </> : <></>}
            </> : <></>}
        </form>)
    }
}

export default DefineSowedPlant