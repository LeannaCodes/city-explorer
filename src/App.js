import React from "react";
import "./App.css";
import axios from "axios";
import ErrorMsg from "./ErrorMsg";
import Weather from "./Weather";

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
    let res;
    console.log(process.env.REACT_APP_CITY_EXPLORER_TOKEN);
    try {
      // const API = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER_TOKEN}&q=${this.state.searchQuery}&format=json`;
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER_TOKEN}&q=${this.state.searchQuery}&format=json`;
      console.log(API);
      res = await axios.get(API);

      // show the map
      const map_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_TOKEN}&q=${this.state.searchQuery}&center=${res.data[0].lat},${res.data[0].lon}&zoom=12`;

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
     this.getWeather(res.data[0].lat, res.data[0].lon);
  };

  getWeather = async (lat, lon) => {
    try {
      const API = `https://localhost:3000/weather/?lat=${lat}&lon=${lon}&searchQuery=${this.state.searchQuery}`;
      const res = await axios.get(API);
      console.log(API);
      this.setState({
        weather: res.data
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
      <div className="container">
        <h1 className="title">Search Anywhere in The World</h1>
        <input
          className="search"
          onChange={this.handleChange}
          placeholder="Explore!"
        />
        <button onClick={this.getLocation}>Search</button>
        {/* <button onClick={this.getMap}>Map</button> */}
        {this.state.location.display_name && (
          <>
            <h2 className="city">
              City: {this.state.location.display_name} {this.state.location.lat}{" "}
              {this.state.location.lon}
            </h2>
            <img src={this.state.mapUrl} alt="map" />
          </>
        )}
        {this.state.weather && <Weather weatherData={this.state.weather}/>
        {this.state.apiError && <ErrorMsg message={this.state.apiError} />}
      </div>
    );
  }
}

export default App;
