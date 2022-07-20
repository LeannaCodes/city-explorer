import React from "react";
import "./App.css";
import axios from "axios";
import ErrorMsg from "./ErrorMsg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
      lat: "",
      lon: "",
      mapUrl: "",
      apiError: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
    console.log(this.state.searchQuery);
  };

  getLocation = async () => {
    try {
      const API = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER_TOKEN}&q=${this.state.searchQuery}&format=json`;
      const res = await axios.get(API);
      console.log(API);

      // show the map
      const map_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_TOKEN}&q=${this.state.searchQuery}&center=${res.data[0].lat},${res.data[0].lon}&zoom=10`;

      this.setState({
        location: res.data[0],
        lat: res.data[0].lat,
        lon: res.data[0].lon,
        mapUrl: map_url,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        apiError: err.message,
        searchQuery: "",
        location: {},
        mapUrl: "",
        lat: "",
        lon: "",
      });
    }
  };

  // getMap = async () => {
  //   const res = await axios.get(API);
  //   console.log(API);
  //   console.log(res);
  //   this.setState({
  //     map: res.data,
  //   });
  // };

  render() {
    return (
      <>
        <input onChange={this.handleChange} placeholder="Explore!" />
        <button onClick={this.getLocation}>Search</button>
        {/* <button onClick={this.getMap}>Map</button> */}
        {this.state.location.display_name && (
          <>
            <h2>
              City: {this.state.location.display_name} {this.state.location.lat}{" "}
              {this.state.location.lon}
            </h2>
            <img src={this.state.mapUrl} alt="map" />
          </>
        )}
        {this.state.apiError && <ErrorMsg message={this.state.apiError} />}
      </>
    );
  }
}

export default App;
