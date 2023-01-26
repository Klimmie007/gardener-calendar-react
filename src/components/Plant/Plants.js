import { Component } from "react";
import { store } from "../Basic/store";
import DefinePlant from "./DefinePlant";
import Plant from "./Plant";

class Plants extends Component
{
    constructor(props)
    {
        super(props)
        store.dispatch({type: 'GET_PLANTS'})
    }

    componentDidMount()
    {
        store.subscribe(() => {
            this.forceUpdate()
        })
    }

    render()
    {
        let plants = store.getState().plants.plants
        let retVal = []
        
        for(let i = 0; i < plants.length; i++)
        {
                retVal.push(<Plant key={"plant" + i} name={plants[i].name} type={plants[i].type}
                    sowingStart={plants[i].sowingSeasonStart} sowingEnd={plants[i].sowingSeasonEnd} 
                    expectedYield={plants[i].expectedYieldInkg} yieldEnd={plants[i].yieldSeasonEnd}
                    yieldStart={plants[i].yieldSeasonStart} minVeg={plants[i].minVegetationCycleInDays}
                    maxVeg={plants[i].maxVegetationCycleInDays}/>)
            retVal.push(<br key={'newLine' + i}/>)
        }
        return(<>
            <DefinePlant/><br/>
            {retVal}
        </>)
    }
}

export default Plants