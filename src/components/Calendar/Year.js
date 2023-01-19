import Month from "./Month";
import ProperDay from "./ProperDay";
import { Component } from "react";
import PropTypes from "prop-types"

class Year extends Component{
    render(){
        const {startDate, dateSelected} = this.props;

        let months = []
        for(let i = startDate.getMonth(); i < 12; i++)
        {
            months.push(<Month key={"month " + i} date={new Date(startDate.getFullYear(), i, 1)} dateSelected={dateSelected}/>)
        }
        return(
            <div>
                <h2>{startDate.getFullYear()}</h2>
                {months}
            </div>
        )
    }
}

Year.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    dateSelected: PropTypes.instanceOf(Date)
}

export default Year