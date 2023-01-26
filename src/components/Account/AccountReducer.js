import { createAction, createReducer, createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit"
import { store } from "../Basic/store"
import { redirect } from "@remix-run/router"
import { BrowserRouter } from "react-router-dom"

const AccountState = {
    Email: "",
    Nickname: "",
    Password: "",
    errorCode: "",
    token: ""
}

const inputEmail = createAction('INPUT_EMAIL')
const inputNickname = createAction('INPUT_NICKNAME')
const inputPassword = createAction('INPUT_PASSWORD')
const register = createAction('REGISTER')
const login = createAction('LOGIN')
const error = createAction('ACCOUNT_ERROR')
const fetch = createAction('FETCH_ACCOUNT')
const changeNickname = createAction('CHANGE_NICKNAME')
const changeEmail = createAction('CHANGE_EMAIL')
const changePassword = createAction('CHANGE_PASSWORD')
const deleteAcc = createAction('DELETE_ACCOUNT')
const setToken = createAction('SET_USER_TOKEN')

const AccountReducer = createReducer(AccountState, (builder) => {
    builder
        .addCase(setToken, (state, action) => {
            state.token = action.token
            if(action.token != "")
            {
                localStorage.setItem("token", action.token)
            }
        })
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
                        store.dispatch({type: "ACCOUNT_ERROR", text: "OK"})
                        store.dispatch({type:"SET_USER_TOKEN", token:JSON.parse(request.response).token})
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
                        store.dispatch({type: "ACCOUNT_ERROR", text: "OK"})
                        store.dispatch({type:"SET_USER_TOKEN", token:JSON.parse(request.response).token})
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
        .addCase(fetch, (state) => {
            state.Password = ""
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
                        let user = JSON.parse(request.response)
                        store.dispatch({type: "INPUT_EMAIL", Email: user.email})
                        store.dispatch({type: "INPUT_NICKNAME", Nickname: user.nickname})   
                    }
                }
            }
            request.open("POST", "http://localhost:3000/api/user", true)
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.setRequestHeader("token", localStorage.getItem("token"))
            request.send()
        })
        .addCase(changeEmail, (state) => {
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 204)
                    {
                        store.dispatch({type: "ACCOUNT_ERROR", text: request.responseText})
                    }
                }
            }
            request.open("PUT", "http://localhost:3000/api/user/email", true)
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.setRequestHeader("token", localStorage.getItem("token"))
            request.send(JSON.stringify({email: state.Email}))
            state.errorCode =  "Email successfully changed"
        })
        .addCase(changeNickname, (state) => {
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 204)
                    {
                        store.dispatch({type: "ACCOUNT_ERROR", text: request.responseText})
                    }
                }
            }
            request.open("PUT", "http://localhost:3000/api/user/nickname", true)
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.setRequestHeader("token", localStorage.getItem("token"))
            request.send(JSON.stringify({nickname: state.Nickname}))
            state.errorCode = "Nickname successfully changed"
        })
        .addCase(changePassword, (state) => {
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 204)
                    {
                        store.dispatch({type: "ACCOUNT_ERROR", text: request.responseText})
                    }
                }
            }
            request.open("PUT", "http://localhost:3000/api/user/password", true)
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.setRequestHeader("token", localStorage.getItem("token"))
            request.send(JSON.stringify({password: state.Password}))
            state.errorCode = "Password successfully changed"
        })
        .addCase(deleteAcc, (state) => {
            let request = new XMLHttpRequest()
            
            request.onreadystatechange = () => {
                if(request.readyState === XMLHttpRequest.DONE)
                {
                    if(request.status != 204)
                    {
                        store.dispatch({type: "ACCOUNT_ERROR", text: request.responseText})
                    }   
                }
            }
            request.open("DELETE", "http://localhost:3000/api/user/delete", true)
            request.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
            request.setRequestHeader("token", localStorage.getItem("token"))
            request.send()
            state.errorCode = "REMOVED"
            localStorage.removeItem("token")
        })
})

export default AccountReducer