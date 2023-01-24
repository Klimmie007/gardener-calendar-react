import { createAction, createReducer } from "@reduxjs/toolkit"
import { store } from "../Basic/store"
import { redirect } from "@remix-run/router"
import { BrowserRouter } from "react-router-dom"

const AccountState = {
    Email: "",
    Nickname: "",
    Password: "",
    accountError: ""
}

const inputEmail = createAction('INPUT_EMAIL')
const inputNickname = createAction('INPUT_NICKNAME')
const inputPassword = createAction('INPUT_PASSWORD')
const register = createAction('REGISTER')
const login = createAction('LOGIN')
const error = createAction('ACCOUNT_ERROR')

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
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 200)
                    {
                        store.dispatch({type: "ACCOUNT_ERROR", text: request.responseText})
                        console.log(request.response)
                    }
                    else
                    {
                        store.dispatch({type: "ACCOUNT_ERROR", text: ""})
                        localStorage.setItem("token", request.response.JSON.token)
                        window.location.replace("http://localhost:3001/")
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
                        store.dispatch({type: "ACCOUNT_ERROR", text: request.responseText})
                    }
                    else
                    {
                        store.dispatch({type: "ACCOUNT_ERROR", text: ""})
                        localStorage.setItem("token", request.response.token)
                        window.location.replace("http://localhost:3001/")    
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