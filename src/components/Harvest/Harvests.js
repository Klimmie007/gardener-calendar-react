import { Component } from "react";
import { store } from "../Basic/store";

class Harvests extends Component
{
    constructor(props)
    {
        super(props)
        store.dispatch({type: "GET_HARVESTS"})
    }

    componentDidMount()
    {
        store.subscribe(() => this.forceUpdate())
    }

    render()
    {
        let harvests = store.getState().harvests.Harvests
        let retVal = []
        harvests.forEach((element, key) => {
            console.log(element)
            retVal.push(<p key={key}>Harvest of {element.weight} kg of {element.harvestedPlant.name} from {element.harvestDate}</p>)
        });
        return(<>
            {retVal}
        </>)
    }
}

export default Harvests