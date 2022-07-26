import { Component } from 'react';

class Weather extends Component {
  render() {
    return (
      <div>
        {this.props.weather}
      </div>
    )
  }
}

export default Weather;