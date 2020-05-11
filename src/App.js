import React from "react";

import Cards from "./components/cards/cards";
import Chart from "./components/chart/chart";

import { fetchInitial, fetchSummary, fetchData } from "./api";
import { Form, FormGroup, Label, Input } from "reactstrap";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      country: "",
      province: "",
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const data = await fetchInitial();
    this.setState({ data: data });
    console.log(this.state.data)
  }

  handleChange(e) {
    
  }

  render() {
    const { countries, data } = this.state;
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="exampleSelect">Country</Label>
            <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange}>
              <option>Global</option>
              <option>asdf</option>
              { countries.map(country => {
                return <option>{country}</option>
              }) }
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">State/Province</Label>
            <Input type="select" name="select" id="exampleSelect">
              {/* <option>Global</option>
              { countries.map(country => {
                return <option>{country}</option>
              }) } */}
            </Input>
          </FormGroup>
        </Form>
        <Cards data={data ? data[0] : null} />
        <Chart />
      </div>
    );
  }
}

export default App;
