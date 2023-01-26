import { createAction, createReducer } from "@reduxjs/toolkit"
import { store } from "../Basic/store"

const today = new Date()

const PlantState = {
    Type: "Plant",
    Sowing_Season_Start: today.getFullYear() + "-" + (today.getMonth() < 9 ? "0" : "") +  (today.getMonth() + 1) + "-" + today.getDate(),
    Sowing_Season_End: today.getFullYear() + "-" + (today.getMonth() < 9 ? "0" : "") +  (today.getMonth() + 1) + "-" + today.getDate(),
    Yield_Season_Start: today.getFullYear() + "-" + (today.getMonth() < 9 ? "0" : "") +  (today.getMonth() + 1) + "-" + today.getDate(),
    Yield_Season_End: today.getFullYear() + "-" + (today.getMonth() < 9 ? "0" : "") +  (today.getMonth() + 1) + "-" + today.getDate(),
    Min_Vegetation_Cycle_In_Days: 0,
    Max_Vegetation_Cycle_In_Days: 0,
    Name: "",
    Expected_Yield_In_kg: 0,
    plants: []
}

const setType = createAction('SET_TYPE')
const setSowingSeasonStart = createAction('SET_SOWING_SEASON_START')
const setSowingSeasonEnd = createAction('SET_SOWING_SEASON_END')
const setYieldSeasonStart = createAction('SET_YIELD_SEASON_START')
const setYieldSeasonEnd = createAction('SET_YIELD_SEASON_END')
const setMinVegCycle = createAction('SET_MIN_VEG_CYCLE')
const setMaxVegCycle = createAction('SET_MAX_VEG_CYCLE')
const setName = createAction('SET_NAME')
const setExpectedYield = createAction('SET_EXPECTED_YIELD')
const upload = createAction('UPLOAD_PLANT')
const getPlants = createAction('GET_PLANTS')
const setPlants = createAction('SET_PLANTS')

const PlantReducer = createReducer(PlantState, (builder) => {
    builder
        .addCase(setPlants, (state, action) => {
            state.plants = JSON.parse(action.plants)
        })
        .addCase(getPlants, () => {
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
                        store.dispatch({type: 'SET_PLANTS', plants: request.response})
                    }
                }
            }
            request.open("GET", "http://localhost:3000/api/plant")
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.send()
        })
        .addCase(setType, (state, action) => {
            state.Type = action.plantType
        })
        .addCase(setSowingSeasonStart, (state, action) => {
            state.Sowing_Season_Start = action.Sowing_Season_Start
        })
        .addCase(setSowingSeasonEnd, (state, action) => {
            state.Sowing_Season_End = action.Sowing_Season_End
        })
        .addCase(setYieldSeasonStart, (state, action) => {
            state.Yield_Season_Start = action.Yield_Season_Start
        })
        .addCase(setYieldSeasonEnd, (state, action) => {
            state.Yield_Season_End = action.Yield_Season_End
        })
        .addCase(setMinVegCycle, (state, action) => {
            state.Min_Vegetation_Cycle_In_Days = action.Min_Vegetation_Cycle_In_Days
        })
        .addCase(setMaxVegCycle, (state, action) => {
            state.Max_Vegetation_Cycle_In_Days = action.Max_Vegetation_Cycle_In_Days
        })
        .addCase(setName, (state, action) => {
            state.Name = action.Name
        })
        .addCase(setExpectedYield, (state, action) => {
            state.Expected_Yield_In_kg = action.Expected_Yield_In_kg
        })
        .addCase(upload, (state, action) => {
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
            request.open("POST", "http://localhost:3000/api/plant")
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            let plant = {
                type: state.Type,
                sowingSeasonStart: state.Sowing_Season_Start,
                sowingSeasonEnd: state.Sowing_Season_End,
                yieldSeasonStart: state.Yield_Season_Start,
                yieldSeasonEnd: state.Yield_Season_End,
                minVegetationCycleInDays: state.Min_Vegetation_Cycle_In_Days,
                maxVegetationCycleInDays: state.Max_Vegetation_Cycle_In_Days,
                name: state.Name,
                expectedYieldInkg: state.Expected_Yield_In_kg
            }
            request.send(JSON.stringify(plant))
            state.plants.push(plant)
        })
})

export default PlantReducer