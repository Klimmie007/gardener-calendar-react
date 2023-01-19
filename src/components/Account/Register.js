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
        let field = new Field("Email", "text", "INPUT_EMAIL", "account", this.ValidateEmail)
        return (
            <form onSubmit={(e) => {e.preventDefault(); store.dispatch({type: "REGISTER"})}}>
                <SmartReduxForm field={field}/>
                <p/>
                <SmartReduxForm field={new Field("Nickname", "text", "INPUT_NICKNAME","account", this.ValidateNickname)}/>
                <p/>
                <SmartReduxForm field={new Field("Password", "password", "INPUT_PASSWORD", "account")}/>
                <p/>
                <input type="submit" value="Submit" disabled={!this.state.valid}/>
                <p/>
                <b>{this.state.errorCode}</b>
            </form>
            
        )
    }
}

export default Register