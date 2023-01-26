import { Component } from "react";
import { store } from "../Basic/store";
import DefinePlant from "../Plant/DefinePlant";
import DefineSowedPlant from "./DefineSowedPlant";
import SowedPlant from "./SowedPlant";

class SowedPlants extends Component
{
    constructor(props)
    {
        super(props)
        store.dispatch({type: "GET_SOWED"})
    }

    componentDidMount()
    {
        store.subscribe(() => this.forceUpdate())
    }

    render()
    {
        let retVal = []
        store.getState().sowedPlants.sowedPlants.forEach((element, index) => {
            retVal.push(<SowedPlant element={element} key={"UwU" + index} plantName={element.plantID.name} patchName={element.gardenPatchID.name} sowDate={element.dateSowed} />)
            retVal.push(<br key = {"OwO" + index}/>)
        });
        return(<>
            <DefineSowedPlant/>
            {retVal}
        </>)
    }
}

export default SowedPlants