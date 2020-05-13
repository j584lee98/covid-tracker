import React from "react";
import { Label, Input } from "reactstrap";
import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";

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
    const { countries, country, data, timeline } = this.state;
    configureAnchors({offset: -60, scrollDuration: 200});
    return (
      <div className="app">
        <Navi />
        <ScrollableAnchor id="home">
          <div className="content">
            <h2 className="head">COVID-19 Tracker</h2>
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
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id="charts">
          <div className="content">
            <h3 className="region">
              {country.name ? country.name : "Global Data"}
            </h3>
            <Chart timeline={timeline ? timeline : null} />
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id="stats">
          <div className="content">
            <h1>Stats</h1>
            <div>Content</div>
          </div>
        </ScrollableAnchor>
      </div>
    );
  }
}

export default App;
