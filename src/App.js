import React from "react";
import { Label, Input } from "reactstrap";

import Navi from "./components/navi/navi";
import Cards from "./components/cards/cards";
import Chart from "./components/chart/chart";
import { fetchGlobal, fetchCountries, fetchCountry } from "./api";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      country: {
        name: "",
        timeline: [],
      },
      data: {
        confirmed: 0,
        recovered: 0,
        active: 0,
        deaths: 0,
      },
      global: {
        timeline: [],
      },
      timeline: [],
    };
    this.handleInput = this.handleInput.bind(this);
  }

  async componentDidMount() {
    const globalData = await fetchGlobal();
    this.setState({
      global: {
        timeline: globalData,
      },
      data: {
        confirmed: globalData[0].confirmed,
        recovered: globalData[0].recovered,
        active: globalData[0].active,
        deaths: globalData[0].deaths,
      },
      timeline: globalData,
    });
    const countriesData = await fetchCountries();
    countriesData.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.setState({ countries: countriesData });
  }

  async handleInput(e) {
    if (e.target.value === "Global") {
      // Change to global
      const timeline = this.state.global.timeline;
      this.setState({
        country: {
          name: "",
          timeline: [],
        },
        data: {
          confirmed: timeline[0].confirmed,
          recovered: timeline[0].recovered,
          active: timeline[0].active,
          deaths: timeline[0].deaths,
        },
        timeline: timeline,
      });
    } else {
      // Change to specific country
      const countryData = await fetchCountry(e.target.value);
      const timeline = countryData.timeline;
      if (timeline.length > 0) {
        this.setState({
          country: {
            name: countryData.name,
            timeline: timeline,
          },
          data: {
            confirmed: timeline[0].confirmed,
            recovered: timeline[0].recovered,
            active: timeline[0].active,
            deaths: timeline[0].deaths,
          },
          timeline: timeline,
        });
      } else {
        this.setState({
          country: {
            name: countryData.name,
            timeline: [],
          },
          data: {
            confirmed: 0,
            recovered: 0,
            active: 0,
            deaths: 0,
          },
          timeline: [],
        });
      }
    }
  }

  render() {
    const { data, countries, timeline } = this.state;
    return (
      <div className="app">
        <Navi />
        <h1 className="head">COVID-19 Tracker</h1>
        <div className="content">
          <Label for="country">Country</Label>
          <Input
            type="select"
            name="select"
            id="country"
            onChange={this.handleInput}
          >
            <option>Global</option>
            {countries.map((country, index) => {
              return (
                <option key={index} value={country.code}>
                  {country.name}
                </option>
              );
            })}
          </Input>
          <Cards data={data ? data : null} />
          <Chart timeline={timeline ? timeline : null} />
        </div>
      </div>
    );
  }
}

export default App;
