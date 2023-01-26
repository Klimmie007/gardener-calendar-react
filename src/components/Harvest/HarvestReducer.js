import { createAction, createReducer } from "@reduxjs/toolkit"
import { store } from "../Basic/store"

const today = new Date()

const HarvestState = {
    Harvests: [],
    Date: today.getFullYear() + "-" + (today.getMonth() < 9 ? "0" : "") +  (today.getMonth() + 1) + "-" + today.getDate(),
    Yield: 0
}

const getHarvests = createAction("GET_HARVESTS")
const setHarvests = createAction("SET_HARVESTS")
const harvest = createAction("HARVEST")
const setYield = createAction("SET_YIELD")
const setDate = createAction("SET_HARVEST_DATE")

const HarvestReducer = createReducer(HarvestState, (builder) => {
    builder
        .addCase(harvest, (state, action) => {
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 204)
                    {
                        console.log(request.responseText)
                    }
                    else
                    {
                        console.log("UWU works")
                    }
                }
            }
            request.open("POST", "http://localhost:3000/api/harvest/id")
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            let plant = {cropID: action.crop._id, harvestDate: state.Date, weight: state.Yield}
            console.log(plant)
            request.send(JSON.stringify(plant))
            state.Harvests.push(plant)

        })
        .addCase(getHarvests, () => {
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
                        store.dispatch({type: "SET_HARVESTS", harvests: JSON.parse(request.response)})
                    }
                }
            }
            request.open("GET", "http://localhost:3000/api/harvest")
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.send()
        })
        .addCase(setHarvests, (state, action) => {
            state.Harvests = action.harvests
        })
        .addCase(setYield, (state, action) => {
            state.Yield = action.Yield
        })
        .addCase(setDate, (state, action) => {
            state.Date = action.Date
        })
})

export default HarvestReducer
