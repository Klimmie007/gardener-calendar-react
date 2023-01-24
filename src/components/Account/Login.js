import { Component } from "react";
import SmartReduxForm from "../Basic/smartForm";
import { store } from "../Basic/store";

class Login extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {valid: false}
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
            this.setState({valid: this.ValidateEmail(store.getState().account.Email) === "" && store.getState().account.Password != "", errorCode: store.getState().account.errorCode})
        }) 
    }
    
    render()
    {
        return (
            <form onSubmit={(e) => {e.preventDefault(); store.dispatch({type: "LOGIN"})}}>
                <SmartReduxForm name="Email" dispatch="INPUT_EMAIL" reducer="account" validate={this.ValidateEmail}/>
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

export default Login