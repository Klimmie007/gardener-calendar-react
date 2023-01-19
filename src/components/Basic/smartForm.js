import { store } from "./store"
import PropTypes from "prop-types"
import Field from "./Field"

const SmartReduxForm = (props) =>
{
    let field = props.field
    const retVal = []
    retVal.push(<label key={"label"}>{field.name}:</label>)
    retVal.push(<p key="name new line"></p>)
    retVal.push(<input key={"input"} type={field.type} 
                value={store.getState().account[field.name.replace(/\s*/g, '_')]} 
                onChange={e => store.dispatch({type: field.dispatch, [field.name]: e.target.value})}/>)
    let error = field.validate(store.getState().account[field.name])
    if(error !== "")
    {
        retVal.push(<p key={"error new line"}></p>)
        retVal.push(<b key={"error"} style={{color: "red"}}>{error}</b>)
    }
    return retVal
}

SmartReduxForm.propTypes = {
    field: PropTypes.instanceOf(Field)
}


export default SmartReduxForm