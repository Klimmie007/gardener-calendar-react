import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { store } from '../Basic/store';


class ProperDay extends Component
{
  render()
  {
    
    const day = this.props.day
    let plants = store.getState().plants.plants
    console.log(plants)
    let selectedPlants = []
    plants.forEach(element => {
      if(new Date(element.sowingSeasonStart).getTime() <= day.getTime() && new Date(element.sowingSeasonEnd).getTime() >= day.getTime())
      {
        selectedPlants.push(element)
      }
    });
    console.log(selectedPlants)
    let crops = store.getState().sowedPlants.sowedPlants
    let selectedCrops = []
    crops.forEach(element => {
      let dateMin, dateMax;
      if(element.type == "Plant")
      {
        dateMin = new Date(element.Sow_Date)
        dateMax = new Date(element.Sow_Date)
        dateMin.setDate(dateMin.getDate() + element.plantID.minVegetationCycleInDays)
        dateMax.setDate(dateMin.getDate() + element.plantID.maxVegetationCycleInDays)
      }
      else
      {
        dateMin = new Date(element.plantID.yieldSeasonStart)
        dateMax = new Date(element.plantID.yieldSeasonEnd)
      }
      if(dateMin.getTime() <= day.getTime()  && dateMax.getTime() >= day.getTime())
      {
        selectedCrops.push(element)
      }
    });
    let textPlants = "On this day you can plant: "
    selectedPlants.forEach((element) => {
      textPlants += element.name + ", "
    })
    let textCrops = "The following crops may be ready to harvest: "
    selectedCrops.forEach((element) => {
      textCrops += element.plantID.name + " from " + element.gardenPatchID.name + ", "
    })
    return (
      <>
        <p>{day.toString()}</p>
        <p>{textPlants}</p>
        <p>{textCrops}</p>
      </>
    );
  }
}

ProperDay.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired
}

export default ProperDay;
