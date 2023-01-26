import { createAction, createReducer } from "@reduxjs/toolkit"
import { store } from "../Basic/store"

const today = new Date()

const SowedPlantState = {
    plantSelected: {},
    patchSelected: {},
    Sow_Date: today.getFullYear() + "-" + (today.getMonth() < 9 ? "0" : "") +  (today.getMonth() + 1) + "-" + today.getDate(),
    plantsAvailable: [],
    sowedPlants: [],
    patches: []
}

const setPlant = createAction('SET_PLANT')
const setPatch = createAction('SET_PATCH')
const setSowDate = createAction('SET_SOW_DATE')
const setAvailable = createAction('SET_AVAILABLE')
const sendToBackend = createAction('SEND_TO_BACKEND')
const getPatches = createAction('GET_PATCHES')
const setPatches = createAction('SET_PATCHES')
const getSowed = createAction('GET_SOWED')
const setSowed = createAction('SET_SOWED')

const SowedPlantReducer = createReducer(SowedPlantState, (builder) => {
    builder
        .addCase(setSowed, (state, action) => {
            state.sowedPlants = action.sowed
        })
        .addCase(getSowed,  () => {
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 200)
                    {
                        console.log(request.responseText)
                    }
                    else
                    {
                        store.dispatch({type: "SET_SOWED", sowed: JSON.parse(request.response)})
                    }
                }
            }
            request.open("GET", "http://localhost:3000/api/sowedPlant")
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.send()
        })
        .addCase(setPatches, (state, action) => {
            state.patches = action.patches
        })
        .addCase(getPatches, (state, action) => {
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 200)
                    {
                        console.log(request.responseText)
                    }
                    else
                    {
                        store.dispatch({type: "SET_PATCHES", patches: JSON.parse(request.response)})
                    }
                }
            }
            request.open("GET", "http://localhost:3000/api/gardenPatches")
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.send()
        })
        .addCase(setAvailable, (state, action) => {
            state.plantsAvailable = action.plants
            if(action.plants.length == 1)
            {
                state.plantSelected = action.plants[0]
            }
        })
        .addCase(setPlant, (state, action) =>{
            state.plantSelected = action.plantSelected
        })
        .addCase(setPatch, (state, action) => {
            state.patchSelected = action.patchSelected
        })
        .addCase(setSowDate, (state, action) => {
            state.Sow_Date = action.Sow_Date
        })
        .addCase(sendToBackend, (state) => {
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 200)
                    {
                        console.log(request.responseText)
                    }
                    else
                    {
                        console.log("UWU works")
                    }
                }
            }
            request.open("PUT", "http://localhost:3000/api/sowedPlant")
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            let plant = {
                gardenPatchID: state.patchSelected._id,
                plantID: state.plantSelected._id,
                dateSowed: state.Sow_Date
            }
            request.send(JSON.stringify(plant))
            state.sowedPlants.push({gardenPatchID: state.patchSelected, plantID: state.plantSelected, dateSowed: state.Sow_Date})
        })
})

export default SowedPlantReducer