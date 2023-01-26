import PropTypes from "prop-types"

function Plant(props)
{
    let retVal = []
    if(props.type == "Plant")
    {
        retVal.push(<p key="minveg">Min Vegetation Cycle In Days: {props.minVeg}</p>)
        retVal.push(<p key="maxveg">Max Vegetation Cycle In Days: {props.maxVeg}</p>)
    }
    else
    {
        retVal.push(<p key="yieldstart">Yield Season Starts: {props.yieldStart}</p>)
        retVal.push(<p key="yieldEnd">Yield Season Ends: {props.yieldEnd}</p>)
    }
    return(
        <>
            <p>Name: {props.name}</p>
            <p>Type: {props.type}</p>
            <p>Sowing Season Starts: {props.sowingStart}</p>
            <p>Sowing Season Ends: {props.sowingEnd}</p>
            {retVal}
            <p>Expected to produce {props.expectedYield} kg of crops</p>
        </>
    )
}

Plant.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sowingStart: PropTypes.string.isRequired,
    sowingEnd: PropTypes.string.isRequired,
    expectedYield: PropTypes.number.isRequired,
    yieldStart: PropTypes.string,
    yieldEnd: PropTypes.string,
    minVeg: PropTypes.number,
    maxVeg: PropTypes.number
}

export default Plant