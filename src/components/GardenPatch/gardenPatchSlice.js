import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import GardenPatchModel from "../../models/GardenPatchModel";

export const getGardenPatchesAsync = createAsyncThunk(
    'gardenPatches/getGardenPatchesAsync',
    async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/gardenPatches');
            const gardenPatches = await res.data.map((gardenPatch) => {
                return {
                    _id: gardenPatch._id,
                    name: gardenPatch.name,
                    type: gardenPatch.type,
                    amount: gardenPatch.amount
                };
            });
            
            return { gardenPatches };
        }
        catch(err) {
            console.log(err);
        }
    }
);

export const addGardenPatchAsync = createAsyncThunk(
    'gardenPatches/addGardenPatchAsync',
    async (payload) => {
        const gardenPatch = await axios.post('http://localhost:3000/api/gardenPatches', new GardenPatchModel(
            payload.name,
            payload.type,
            payload.amount
        ).toJSON())
        .then(res => {
            const gardenPatch = {
                _id: res.data.newGardenPatch._id,
                name: res.data.newGardenPatch.name,
                type: res.data.newGardenPatch.type,
                amount: res.data.newGardenPatch.amount
            }
            return { gardenPatch };
        })
        .catch((e) => {
            console.log(e);
        });
        return gardenPatch;
    }
);

const gardenPatchSlice = createSlice({
    name: 'gardenPatches',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getGardenPatchesAsync.fulfilled, (state, action) => {
            return action.payload.gardenPatches;
        })
        .addCase(addGardenPatchAsync.fulfilled, (state, action) => {
            state.push(action.payload.gardenPatch);
        });
    }
});

export default gardenPatchSlice.reducer;