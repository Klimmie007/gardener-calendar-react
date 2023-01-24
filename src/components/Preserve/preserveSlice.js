import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import PreserveModel from "../../models/PreserveModel";

export const getPreservesAsync = createAsyncThunk(
    'preserves/getPreservesAsync',
    async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/preserves');
            const preserves = await res.data.map((preserve) => {
                return {
                    name: preserve.name,
                    description: preserve.description,
                    dateOfProduction: preserve.dateOfProduction,
                    expirationDate: preserve.expirationDate
                };
            });
            return { preserves };
        }
        catch(err) {
            console.error(err);
        }
    }        
);

export const addPreserveAsync = createAsyncThunk(
    'preserves/addPreserveAsync',
    async (payload) => {
        const preserve = await axios.post('http://localhost:3000/api/preserves', new PreserveModel(
            payload.name,
            payload.description,
            new Date(payload.dateOfProduction),
            new Date(payload.expirationDate)
        ).toJSON())
        .then(res => {
            console.log(res);
            const preserve = {
                name: res.data.newPreserve.name,
                description: res.data.newPreserve.description,
                dateOfProduction: res.data.newPreserve.dateOfProduction,
                expirationDate: res.data.newPreserve.expirationDate
            }
            return { preserve };
        }).catch((e) => {
            console.log(e);
        });
        return preserve;
    }
);

const preserveSlice = createSlice({
    name: 'preserves',
    initialState: [],
    reducers: {
        addPreserve: (state, action) => {
            const newPreserve = {
                name: action.payload.name,
                description: action.payload.description,
                dateOfProduction: action.payload.dateOfProduction,
                expirationDate: action.payload.expirationDate
            }
            state.push(newPreserve);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPreservesAsync.fulfilled, (state, action) => {
            return action.payload.preserves;
        })
        .addCase(addPreserveAsync.fulfilled, (state, action) => {
            state.push(action.payload.preserve);
        });
        /*[getPreservesAsync.fulfilled]: (state, action) => {
            return action.payload.preserves;
        }*/
    }
});

export const { addPreserve } = preserveSlice.actions;
export default preserveSlice.reducer;