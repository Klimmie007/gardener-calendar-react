import { createAction, createReducer } from "@reduxjs/toolkit"
import { store } from "../Basic/store"

const AccountState = {
    Email: "",
    Nickname: "",
    Password: "",
    errorCode: ""
}

const inputEmail = createAction('INPUT_EMAIL')
const inputNickname = createAction('INPUT_NICKNAME')
const inputPassword = createAction('INPUT_PASSWORD')
const register = createAction('REGISTER')
const login = createAction('LOGIN')
const error = createAction('ERROR')

const AccountReducer = createReducer(AccountState, (builder) => {
    builder
        .addCase(inputEmail, (state, action) => {
            state.Email = action.Email
        })
        .addCase(inputNickname, (state, action) =>{
            state.Nickname = action.Nickname
        })
        .addCase(inputPassword, (state, action) => {
            state.Password = action.Password
        })
        .addCase(register, (state) =>{
            console.log(state)
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 200)
                    {
                        store.dispatch({type: "ERROR", text: request.responseText})
                        console.log(request.response)
                    }
                    else
                    {
                        store.dispatch({type: "ERROR", text: ""})
                    }
                }
            }
            request.open("POST", "http://localhost:3000/api/register", true)
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.send(JSON.stringify({"email": state.Email, "nickname": state.Nickname, "password": state.Password}))
        })
        .addCase(login, (state) => {
            console.log(state)
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 200)
                    {
                        store.dispatch({type: "ERROR", text: request.responseText})
                    }
                }
            }
            request.open("POST", "http://localhost:3000/api/login", true)
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.send(JSON.stringify({"email": state.Email, "password": state.Password}))
        })
        .addCase(error, (state, action) => {
            state.errorCode = action.text
        })
})

export default AccountReducer