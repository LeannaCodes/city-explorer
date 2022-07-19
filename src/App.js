import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
    };
  }

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
    console.log(this.state.searchQuery);
  };

  getLocation = async () => {
    const API = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER_TOKEN}&q=${this.state.searchQuery}&format=json`;
    const res = await axios.get(API);
    console.log(API);
    this.setState({
      location: res.data[0],
      lat: res.data[0].lat,
      lon: res.data[0].lon,
    });
    console.log(res.data);
  };

  getMap = async () => {
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_TOKEN}&q=${this.state.searchQuery}&center=${this.state.lat},${this.state.lon}&zoom=1`;
    const res = await axios.get(API);
    console.log(API)
    console.log(res);
    this.setState({
      map:res.data
     })
  };

  render() {
    return (
      <>
        <input onChange={this.handleChange} placeholder="Explore!" />
        <button onClick={this.getLocation}>Search</button>
        <button onClick={this.getMap}>Map</button>
        {this.state.location.display_name && (
          <h2>
            City: {this.state.location.display_name}{" "}
            {this.state.location.lat} {this.state.location.lon}
          </h2>
        )}
        {this.state.map}
        
      </>
    );
  }
}

export default App;
