import { Component } from "react";
import DropdownBox from "../Basic/DropdownBox";
import SmartReduxForm from "../Basic/smartForm";
import { store } from "../Basic/store";

const options = [
    { value: 'Plant', label: 'Plant' },
    { value: 'Bush', label: 'Bush' },
    { value: 'Tree', label: 'Tree' }
];

class DefinePlant extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {valid: false}
    }

    componentDidMount()
    {
        store.subscribe(()=>{
            this.forceUpdate()
        })

    }

    setType(type)
    {
        store.dispatch({type: "SET_TYPE", plantType: type})
    }

    VerifyNumber(input)
    {
        let strInput = "" + input
        if(strInput.match(/[1-9][0-9]*/g))
        {
            return ""
        }
        else
        {
            return "Value has to be a non-negative, whole number"
        }
    }

    VerifyFloat(input)
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

    VerifyBiggerThanMin(input)
    {
        let strInput = "" + input
        if(!strInput.match(/[1-9][0-9]*/g))
        {
            return "Value has to be a non-negative, whole number"
        }
        if(parseInt(store.getState().plants.Min_Vegetation_Cycle_In_Days) > store.getState().plants.Max_Vegetation_Cycle_In_Days)
        {
            return "Maximum value should be bigger than or equal to minimum value!"
        }
        return ""
    }

    render()
    {
        let valid = store.getState().plants.Name != "" && (store.getState().plants.Type == "Plant" ? 
        this.VerifyNumber(store.getState().plants.Min_Vegetation_Cycle_In_Days) == "" && 
        this.VerifyBiggerThanMin(store.getState().plants.Max_Vegetation_Cycle_In_Days) == "" : true) &&
        this.VerifyFloat(store.getState().plants.Expected_Yield_In_kg) == ""
        let type = store.getState().plants.Type
        let retVal = []
        retVal.push(
            <SmartReduxForm key="NAME" name="Name" dispatch="SET_NAME" reducer="plants"/>
        )
        retVal.push(<br key="nameNewLine"/>)
        retVal.push(
            <SmartReduxForm key="sowstart" name="Sowing_Season_Start" dispatch="SET_SOWING_SEASON_START" reducer="plants" type="date"/>
        )
        retVal.push(<br key="sowStartNewLine"/>)
        retVal.push(
            <SmartReduxForm key="sowEnd" name="Sowing_Season_End" dispatch="SET_SOWING_SEASON_END" reducer="plants" type="date"/>
        )
        retVal.push(<br key="sowEndNewLine"/>)
        if(type === "Plant")
        {
            retVal.push(
                <SmartReduxForm key="minVeg" name="Min_Vegetation_Cycle_In_Days" dispatch="SET_MIN_VEG_CYCLE" reducer="plants" validate={this.VerifyNumber}/>
            )
            retVal.push(<br key="minVegNewLine"/>)
            retVal.push(
                <SmartReduxForm key="maxVeg" name="Max_Vegetation_Cycle_In_Days" dispatch="SET_MAX_VEG_CYCLE" reducer="plants" validate={this.VerifyBiggerThanMin}/>
            )
            retVal.push(<br key="maxVegNewLine"/>)
        }
        else
        {
            retVal.push(
                <SmartReduxForm key="yieldstart" name="Yield_Season_Start" dispatch="SET_YIELD_SEASON_START" reducer="plants" type="date"/>
            )
            retVal.push(<br key="yieldStartNewLine"/>)
            retVal.push(
                <SmartReduxForm key="yieldend" name="Yield_Season_End" dispatch="SET_YIELD_SEASON_END" reducer="plants" type="date"/>
            )
            retVal.push(<br key="yieldendNewLine"/>)
        }
        retVal.push(
            <SmartReduxForm key="expYield" name="Expected_Yield_In_kg" dispatch="SET_EXPECTED_YIELD" reducer="plants" validate={this.VerifyFloat}/>
        )
        retVal.push(<br key="expYieldNewLine"/>)
        
        return(
            <form onSubmit={(e) => {e.preventDefault(); store.dispatch({type: "UPLOAD_PLANT"})}}>
                <DropdownBox labelAccessor="label" callback={(val) => this.setType(val)} title="Type" value={type} values={options} valAccessor="value"/><br/>
                {retVal}
                <input type="submit" value="Submit" disabled={!valid}/>
            </form>
        )
    }
}

export default DefinePlant