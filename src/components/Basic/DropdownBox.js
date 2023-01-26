import PropTypes from 'prop-types'

function DropdownBox(props) 
{
    return(
    <label>
        {props.title}:
        <select value={props.value} onChange={(event) => props.callback(event.target.value)}>
            <option disabled={true} value="">Select {props.title}</option>
            {props.values.map((option, key) => {
                return <option key={key} value={option[props.valAccessor]}>{option[props.labelAccessor]}</option>
            })}
        </select>
    </label>)
}

DropdownBox.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    valAccessor: PropTypes.string.isRequired,
    labelAccessor: PropTypes.string.isRequired,
}

export default DropdownBox