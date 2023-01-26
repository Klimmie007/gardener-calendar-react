import { Component } from "react";  
import SmartReduxForm from "../Basic/smartForm";
import { store } from "../Basic/store";
import { Navigate, Link } from "react-router-dom";
import PropTypes from 'prop-types'

class Register extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {valid: false}
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
        let valid = this.ValidateEmail(store.getState().account.Email) === "" && store.getState().account.Nickname != "" && store.getState().account.Password != ""
        const redirect = []
        if(store.getState().account.errorCode === "OK")
        {
            redirect.push(<Navigate key="redirect" to="/" replace={true}/>)
        }
        return (
            <form onSubmit={(e) => {e.preventDefault(); store.dispatch({type: this.props.intent})}}>
                <SmartReduxForm name="Email" dispatch="INPUT_EMAIL" reducer="account" validate={this.ValidateEmail}/>
                <p/>
                {this.props.intent === "REGISTER" ? <><SmartReduxForm name="Nickname" dispatch="INPUT_NICKNAME" reducer="account"/>
                <p/></> : <></>}
                <SmartReduxForm name="Password" dispatch="INPUT_PASSWORD" reducer="account" type="password"/>
                <p/>
                <input type="submit" value="Submit" disabled={!this.state.valid}/>
                <p/>
                <b>{store.getState().account.errorCode}</b>
                {redirect}
                {this.props.intent === "REGISTER" ? <Link to="/registerOrLogin/login">Login</Link> : <Link to="/registerOrLogin/register">Register</Link>}
            </form>
            
        )
    }
}

Register.propTypes = {
    intent: PropTypes.string.isRequired
}

export default Register