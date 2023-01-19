import { createAction, createReducer } from "@reduxjs/toolkit"

const CalendarState = {
    startDate: new Date().getTime(),
    endYear: new Date().getFullYear(),
    dateSelected: new Date().getTime()
}

const select = createAction('SELECT_DAY')
const deselect = createAction('DESELECT_DAY')
const prevYear = createAction('ADD_PREV_YEAR')
const nextYear = createAction('ADD_NEXT_YEAR')

const CalendarReducer = createReducer(CalendarState, (builder) => {
    builder
        .addCase(select, (state, action) => {
            state.dateSelected = new Date(action.date).getTime()
            console.log(state.dateSelected)
        })
        .addCase(deselect, (state) =>{
            state.dateSelected = null
            console.log("UWU")
        })
        .addCase(prevYear, (state) => {
            console.log("OwO")
            state.startDate = (new Date(state.startDate).getMonth() != 0 ? new Date(new Date(state.startDate).getFullYear(), 0, 1).getTime() : new Date(new Date(state.startDate).getFullYear() - 1, 0, 1).getTime())
        })
        .addCase(nextYear, (state) =>{
            console.log("UmU")
            state.endYear++
        })
})

export default CalendarReducer