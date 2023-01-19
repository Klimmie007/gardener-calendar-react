import { Component } from "react";
import Field from "../Basic/Field";
import SmartReduxForm from "../Basic/smartForm";
import { store } from "../Basic/store";

class Register extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            count: 0
        }
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

    ValidateNickname(nickname)
    {
        console.log(nickname)
        if(nickname)
        {
            return ""
        }
        else
        {
            return "Nickname field cannot be empty"
        }
    }

    componentDidMount()
    {
        store.subscribe(()=>{
            this.setState({valid: this.ValidateEmail(store.getState().account.Email) === "", errorCode: store.getState().account.errorCode})
        }) 
    }
    
    render()
    {
        return (
            <form onSubmit={(e) => {e.preventDefault(); store.dispatch({type: "REGISTER"})}}>
                <SmartReduxForm name="Email" dispatch="INPUT_EMAIL" reducer="account" validate={this.ValidateEmail}/>
                <p/>
                <SmartReduxForm name="Nickname" dispatch="INPUT_NICKNAME" reducer="account"/>
                <p/>
                <SmartReduxForm name="Password" dispatch="INPUT_PASSWORD" reducer="account" type="password"/>
                <p/>
                <input type="submit" value="Submit" disabled={!this.state.valid}/>
                <p/>
                <b>{this.state.errorCode}</b>
            </form>
            
        )
    }
}

export default Register