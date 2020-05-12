import React from "react";
import Cards from "./components/cards/cards";
import Chart from "./components/chart/chart";

import { fetchGlobal, fetchCountries, fetchCountry } from "./api";
import { Form, FormGroup, Label, Input } from "reactstrap";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
      ticker: 0,
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleDates = this.handleDates.bind(this);
  }

  async componentDidMount() {
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
    this.setState({ countries: countriesData });
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
    console.log(this.state.country.name);
    this.setState({
      loading: false,
      country: {
        name: countryData.name,
        timeline: countryData.timeline,
      },
      timeline: countryData.timeline,
    });
    console.log(this.state.country.name);
  }

  handleDates(e) {
    const timeline = this.state.timeline;
    if (e.target.value.length > 0) {
      const start = JSON.parse(e.target.value).start;
      const end = JSON.parse(e.target.value).end;
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
          confirmed: timeline[0].confirmed,
          recovered: timeline[0].recovered,
          active: timeline[0].active,
          deaths: timeline[0].deaths,
        },
      });
    }
  }

  render() {
    const { countries, data } = this.state;
    return (
      <div>
        <Form onChange={this.handleForm}>
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
        {!this.state.loading && <Cards data={data ? data : null} />}
        <Chart />
      </div>
    );
  }
}

export default App;
