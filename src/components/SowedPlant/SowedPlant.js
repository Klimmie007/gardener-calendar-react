import PropTypes, { element } from "prop-types"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import SmartReduxForm from "../Basic/smartForm"
import { store } from "../Basic/store"

function SowedPlant(props)
{
    const [selected, setSelected] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const VerifyFloat = function(input)
    {
        let strInput = "" + input
        if(strInput.match(/^(([1-9][0-9]*|[0-9])\.[0-9]+)|[1-9][0-9]*$/))
        {
            return ""
        }
        else
        {
            return "Value has to be a non-negative, whole number"
        }
    }

    return(<>
        <p>{props.plantName} has been sowed on {props.patchName} on {props.sowDate}</p>
        {!selected ? <button onClick={() => {setSelected(true); store.dispatch({type: "SET_YIELD", Yield: props.element.plantID.expectedYieldInkg})}}>Harvest</button> : <>
            <SmartReduxForm name="Yield" dispatch="SET_YIELD" reducer="harvests" validate={VerifyFloat}/><br/>
            <SmartReduxForm name="Date" dispatch="SET_HARVEST_DATE" reducer="harvests" type="date"/><br/>
            <button disabled={VerifyFloat(store.getState().harvests.Yield) != ""} onClick={() => {store.dispatch({type: 'HARVEST', crop: props.element}); setRedirect(true)}}>Submit</button>
        </>}
        {redirect ? <Navigate to='/harvests' replace={true}/> : <></>} 
    </>)
}

SowedPlant.propTypes = {
    patchName: PropTypes.string.isRequired,
    plantName: PropTypes.string.isRequired,
    sowDate: PropTypes.string.isRequired,
    element: PropTypes.object,
}

export default SowedPlant