import PropTypes from "prop-types"
import { Component } from "react"
import Day from "./Day"
import ProperDay from "./ProperDay"

class Month extends Component{
    daysOfWeek = (<tr key="I ASKED">
        <th key="N">Monday</th>
        <th key="I">Tuesday</th>
        <th key="C">Wednesday</th>
        <th key="E">Thursday</th>
        <th key="L" >Friday</th>
        <th key="Y">Saturday</th>
        <th key="!">Sunday</th>
    </tr>)
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    render() {
        const {date, dateSelected} = this.props
        const weeks = []
        const itDate = new Date(date.getFullYear(), date.getMonth(), 1)
        for(let i = 0; itDate.getMonth() === date.getMonth(); i++)
        {
            let week = [];
            for(let j = 0; j < 7 && itDate.getMonth() === date.getMonth(); j++)
            {
                if(i === 0 && j < (date.getDay() - 1 + 7)%7)
                {
                    week.push(<td key={"empty " + j}/>)
                }
                else
                {
                    week.push(<Day key={itDate.toDateString()} date={new Date(itDate)} isSelected={itDate.getDate() == dateSelected.getDate() && date.getMonth() == dateSelected.getMonth() && date.getYear() == dateSelected.getYear()}/>)
                    itDate.setDate(itDate.getDate()+1)
                }
            }
            weeks.push(<tr key={"week " + i}>{week}</tr>)
        }
        let retVal = [
        <table key="month proper">
            <thead key="header">
                <tr key = "monthName">
                    <th>
                        {this.months[date.getMonth()]}
                    </th>
                </tr>
                {this.daysOfWeek}
            </thead>
            <tbody key="body">
                {weeks}
            </tbody>
        </table> ];
        if(dateSelected != null && dateSelected != undefined)
        {
            if(date.getFullYear() === dateSelected.getFullYear() && date.getMonth() === dateSelected.getMonth())
            {
                retVal.push(<ProperDay key="kutwa" day={dateSelected}/>)
            }
        }

        return(<>{retVal}</>)
    }
}

Month.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    dateSelected: PropTypes.instanceOf(Date).isRequired
}

export default Month
