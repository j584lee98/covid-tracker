import React from "react";

import Cards from "./components/cards/cards";
import Chart from "./components/chart/chart";

import { fetchSummary, fetchData } from "./api";
import { Form, FormGroup, Label, Input } from "reactstrap";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      country: "",
      province: "",
      data: {},
    };
  }

  async componentWillMount() {
    const summary = await fetchSummary();
    const countries = summary["Countries"].map(country => country["Country"]);
    this.setState({ countries: countries });
  }

  async componentDidMount() {
    const data = await fetchData("summary");
    this.setState({ data: data });
    console.log(data)
  }

  render() {
    const { countries, data } = this.state;
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect">
              { countries.map(country => {
                return <option>{country}</option>
              }) }
            </Input>
          </FormGroup>
        </Form>
        <Cards data={data} />
        <Chart />
      </div>
    );
  }
}

export default App;
