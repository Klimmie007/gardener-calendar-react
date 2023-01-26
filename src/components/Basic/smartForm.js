import { store } from "./store"
import PropTypes from "prop-types"

const SmartReduxForm = (props) =>
{
    let name = props.name
    let type = props.type || "text"
    let reducer = props.reducer
    let dispatch =  props.dispatch
    let validate = props.validate
    let pattern = props.pattern
    const retVal = []
    retVal.push(<label key={"label"}>{name.replaceAll('_', ' ')}:</label>)
    retVal.push(<p key="name new line"></p>)
    retVal.push(<input key={"input"} type={type} 
                value={store.getState()[reducer][name]} 
                onChange={e => store.dispatch({type: dispatch, [name]: e.target.value})}/>)
    let error

    if(validate)
    {
        error = validate(store.getState()[reducer][name])
    }
    else
    {
        error = store.getState()[reducer][name] == "" ? "Field cannot be empty" : "" 
    }
    if(error !== "")
    {
        retVal.push(<p key={"error new line"}></p>)
        retVal.push(<b key={"error"} style={{color: "red"}}>{error}</b>)
    }
    return retVal
}

SmartReduxForm.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    reducer: PropTypes.string.isRequired,
    dispatch: PropTypes.string.isRequired,
    validate: PropTypes.func,
    pattern: PropTypes.string
}


export default SmartReduxForm