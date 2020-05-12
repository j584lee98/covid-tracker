import React from "react";
import { Form, FormGroup, Label, Input, Navbar } from "reactstrap";

import Navi from "./components/navi/navi";
import Cards from "./components/cards/cards";
import Chart from "./components/chart/chart";
import { fetchGlobal, fetchCountries, fetchCountry } from "./api";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toUTCString(),
      loading: false,
      global: {
        timeline: [],
      },
      country: {
        name: "",
        timeline: [],
      },
      countries: [],
      data: {
        allTime: true,
        confirmed: 0,
        recovered: 0,
        active: 0,
        deaths: 0,
      },
      timeline: [],
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleDates = this.handleDates.bind(this);
  }

  async componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
    const globalData = await fetchGlobal();
    this.setState({
      global: {
        timeline: globalData,
      },
      data: {
        allTime: true,
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

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toUTCString(),
    });
  }

  handleForm(e) {
    if (e.target.id === "country") {
      if (e.target.value === "Global") {
        this.setState({
          country: {
            name: "",
            timeline: [],
          },
          timeline: this.state.global.timeline,
        });
        console.log(this.state.timeline);
      } else {
        this.handleCountry(e);
      }
    } else {
      this.handleDates(e);
    }
  }

  async handleCountry(e) {
    this.setState({ loading: true });
    const countryData = await fetchCountry(e.target.value);
    this.setState({
      loading: false,
      country: {
        name: countryData.name,
        timeline: countryData.timeline,
      },
      timeline: countryData.timeline,
    });
    this.handleDates();
  }

  handleDates() {
    const input = document.getElementById("dates").value;
    const timeline = this.state.timeline;
    if (input.length > 0) {
      const start = JSON.parse(input).start;
      const end = JSON.parse(input).end;
      if (timeline.length > 0) {
        this.setState({
          data: {
            allTime: false,
            confirmed: timeline[start].confirmed - timeline[end].confirmed,
            recovered: timeline[start].recovered - timeline[end].recovered,
            active: timeline[start].active - timeline[end].active,
            deaths: timeline[start].deaths - timeline[end].deaths,
          },
        });
      } else {
        this.setState({
          data: {
            allTime: false,
            confirmed: 0,
            recovered: 0,
            active: 0,
            deaths: 0,
          },
        });
      }
    } else {
      if (timeline.length > 0) {
        this.setState({
          data: {
            allTime: true,
            confirmed: timeline[0].confirmed,
            recovered: timeline[0].recovered,
            active: timeline[0].active,
            deaths: timeline[0].deaths,
          },
        });
      } else {
        this.setState({
          data: {
            allTime: true,
            confirmed: 0,
            recovered: 0,
            active: 0,
            deaths: 0,
          },
        });
      }
    }
  }

  render() {
    const { data, countries, country, timeline } = this.state;
    return (
      <div className="app">
        <Navi />
        <div className="content">
          <Cards data={data ? data : null} />
        <Form
          onChange={(e) => {
            this.handleForm(e);
          }}
        >
          <FormGroup>
            <Label for="country">Country</Label>
            <Input type="select" name="select" id="country">
              <option>Global</option>
              {countries.map((country, index) => {
                return (
                  <option key={index} value={country.code}>
                    {country.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="dates">Dates (GMT Standard)</Label>
            <Input type="select" name="select" id="dates">
              <option value="">All Time</option>
              <option value='{"start":0,"end":1}'>Today</option>
              <option value='{"start":1,"end":2}'>Yesterday</option>
              <option value='{"start":1,"end":8}'>Last 7 Days</option>
              <option value='{"start":1,"end":31}'>Last 30 Days</option>
            </Input>
          </FormGroup>
        </Form>
        <h1>{this.state.time}</h1>
        <h1>{country.name ? country.name : "Global"}</h1>
        <Chart timeline={timeline ? timeline : null} />
        </div>
      </div>
    );
  }
}

export default App;
