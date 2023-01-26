import { Component } from "react";
import PropTypes from "prop-types"
import { store } from "../Basic/store";

class Day extends Component{
    render() {
        const {date, isSelected} = this.props
        return (
            <td bgcolor={isSelected ? "cyan" : "white"} onClick={() => store.dispatch({type: isSelected ? 'DESELECT_DAY' : 'SELECT_DAY', date: date.getTime()})}>
                {date.getDate()}
            </td>
        )
    }
}

Day.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    isSelected: PropTypes.bool.isRequired
}

export default Day