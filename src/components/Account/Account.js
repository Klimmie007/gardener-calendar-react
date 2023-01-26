import { Component } from "react";
import { store } from "../Basic/store";
import { Navigate } from "react-router-dom";
import SmartReduxForm from "../Basic/smartForm";

class Account extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {valid: false}
        store.dispatch({type: "FETCH_ACCOUNT"})
        store.dispatch({type: "ACCOUNT_ERROR", text: ""})

    }

    ValidateEmail(email)
    {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return ""
        }
        else
        {
            return "Not a vaild email address"
        }
    }

    componentDidMount()
    {
        store.subscribe(()=>{
            this.forceUpdate()
        }) 
    }

    render()
    {
        const redirect = []
        if(store.getState().account.errorCode === "REMOVED")
        {
            redirect.push(<Navigate key="redirect" to="/" replace={true}/>)
        }
            console.log(store.getState().account)
        return (
            <>
                <SmartReduxForm name="Email" dispatch="INPUT_EMAIL" reducer="account" validate={this.ValidateEmail}/>
                <button disabled={this.ValidateEmail(store.getState().account.Email) != ""} onClick={() => {store.dispatch({type: "CHANGE_EMAIL"})}}>Change Email</button>
                <p/>
                <SmartReduxForm name="Nickname" dispatch="INPUT_NICKNAME" reducer="account"/>
                <button disabled={store.getState().account.Nickname == ""} onClick={() => {store.dispatch({type: "CHANGE_NICKNAME"})}}>Change Nickname</button>
                <p/>
                <SmartReduxForm name="Password" dispatch="INPUT_PASSWORD" reducer="account" type="password"/>
                <p/>
                <button disabled={store.getState().account.Password == ""} onClick={() => {store.dispatch({type: "CHANGE_PASSWORD"})}}>Change Password</button>
                <p/>
                <button onClick={()=>{store.dispatch({type: "DELETE_ACCOUNT"})}}>Delete Account</button>
                <p/>
                <b>{store.getState().account.errorCode}</b>
                {redirect}
            </>
            
        )
    }
}

export default Account