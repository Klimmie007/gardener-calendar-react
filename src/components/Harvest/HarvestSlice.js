import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import HarvestModel from "../../models/HarvestModel";

export const getHarvestsAsync = createAsyncThunk(
    'harvests/getHarvestsAsync',
    async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/harvests');
            const harvests = await res.data.map((harvest) => {
                return {
                    weight: harvest.weight,
                    harvestedPlant: harvest.harvestedPlant,
                    harvestDate: harvest.harvestDate
                    
                };
            });
            return { harvests };
        }
        catch(err) {
            console.error(err);
        }
    }        
);

export const addHarvestAsync = createAsyncThunk(
    'harvests/addHarvestAsync',
    async (payload) => {
        const harvest = await axios.post('http://localhost:3000/api/harvests', new HarvestModel(
            payload.weight,
            payload.harvestedPlant,
            new Date(payload.harvestDate)
            
        ).toJSON())
        .then(res => {
            console.log(res);
            const harvest = {
                weight: res.data.newHarvest.weight,
                harvestedPlant: res.data.newHarvest.harvestedPlant,
                harvestDate: res.data.newHarvest.harvestDate
            }
            return { harvest };
        }).catch((e) => {
            console.log(e);
        });
        return harvest;
    }
);

const HarvestSlice = createSlice({
    name: 'harvests',
    initialState: [],
    reducers: {/*
        addHarvest: (state, action) => {
            const newHarvest = {
                weight: action.payload.weight,
                harvestedPlant: action.payload.harvestedPlant,
                harvestDate: action.payload.harvestDate
            }
            state.push(newHarvest);
        },*/
    },
    extraReducers: (builder) => {
        builder
        .addCase(getHarvestsAsync.fulfilled, (state, action) => {
            return action.payload.harvests;
        })
        .addCase(addHarvestAsync.fulfilled, (state, action) => {
            state.push(action.payload.harvest);
        });
    }
});

export const { addHarvest } = HarvestSlice.actions;
export default HarvestSlice.reducer;