import React from "react";

import Cards from "./components/cards/cards";
import Dropdown from "./components/dropdown/dropdown";
import Chart from "./components/chart/chart";

import { fetchData } from "./api";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }
  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data: data });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Cards data={data} />
        <Dropdown />
        <Chart />
      </div>
    );
  }
}

export default App;
