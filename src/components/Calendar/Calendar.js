import Year from "./Year";
import { Component } from "react";
import PropTypes from "prop-types"
import { store } from "../Basic/store";


class Calendar extends Component
{
  constructor(props)
  {
    
    super(props)

    this.state = {
      startDate: new Date(),
      dateSelected: new Date(),
      endYear: new Date().getFullYear()

    };
  }

  componentDidMount()
  {
    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched), 
      // we will update local component state and force component to rerender 
      // with new data.
      console.log(this)
      this.setState({
        startDate: new Date(store.getState().calendar.startDate),
        dateSelected: new Date(store.getState().calendar.dateSelected),
        endYear: store.getState().calendar.endYear
      });
    });
  }

  render()
  {
    let retVal = [<h2 key="JAJA SOBIE ROBISZ">Calendar</h2>, <button key="prevYear" onClick={() => store.dispatch({type:"ADD_PREV_YEAR"})}>View previous year</button>]
    for(let startYear = this.state.startDate.getFullYear(); startYear <= this.state.endYear; startYear++)
    {
      retVal.push(<Year key={"year" + startYear} startDate={startYear == this.state.startDate.getFullYear() ? this.state.startDate: new Date(startYear, 0, 1)} dateSelected={this.state.dateSelected} callback={(action) => {store.dispatch(action)}}/>)
    }
    return(
      <>
        {retVal}
        <button key="nextYear" onClick={()=>store.dispatch({type: "ADD_NEXT_YEAR"})}>
          View next year
        </button>
      </>
    )
  }
}
export default Calendar