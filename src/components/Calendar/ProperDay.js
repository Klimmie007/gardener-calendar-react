import React, {Component} from 'react';
import PropTypes from 'prop-types'


class ProperDay extends Component
{
  render()
  {
    const day = this.props.day
    return (
      <p>{day.toString()}</p>
    );
  }
}

ProperDay.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired
}

export default ProperDay;
