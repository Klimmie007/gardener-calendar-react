import { combineReducers, configureStore, applyMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import { getDefaultNormalizer } from "@testing-library/react";
import AccountReducer from "../Account/AccountReducer";
import CalendarReducer from "../Calendar/CalendarReducer";
import logger from "redux-logger"
import preserveReducer from '../Preserve/preserveSlice'

export const store = configureStore({
    reducer: combineReducers({calendar: CalendarReducer, account: AccountReducer, preserves: preserveReducer})
  })