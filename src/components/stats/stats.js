import React from "react";
import { MDBDataTable } from "mdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "./stats.module.css";

const Stats = (props) => {
  const dataset = props.recent;
  const data = {
    columns: [
      {
        label: ["Country", <FontAwesomeIcon icon={faSort} />],
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: ["Confirmed", <FontAwesomeIcon icon={faSort} />],
        field: "confirmed",
        sort: "desc",
        width: 100,
        color: 'red'
      },
      {
        label: ["New Cases", <FontAwesomeIcon icon={faSort} />],
        field: "new_cases",
        sort: "desc",
        width: 100,
      },
      {
        label: ["Recovered", <FontAwesomeIcon icon={faSort} />],
        field: "recovered",
        sort: "desc",
        width: 100,
      },
      {
        label: ["Active", <FontAwesomeIcon icon={faSort} />],
        field: "active",
        sort: "desc",
        width: 100,
      },
      {
        label: ["Critical", <FontAwesomeIcon icon={faSort} />],
        field: "critical",
        sort: "desc",
        width: 100,
      },
      {
        label: ["Deaths", <FontAwesomeIcon icon={faSort} />],
        field: "deaths",
        sort: "desc",
        width: 100,
      },
      {
        label: ["New Deaths", <FontAwesomeIcon icon={faSort} />],
        field: "new_deaths",
        sort: "desc",
        width: 100,
      },
      {
        label: ["Cases /1 mil", <FontAwesomeIcon icon={faSort} />],
        field: "cases_per_mil",
        sort: "desc",
        width: 100,
      },
      {
        label: ["Recovery Rate", <FontAwesomeIcon icon={faSort} />],
        field: "recovery_rate",
        sort: "desc",
        width: 100,
      },
      {
        label: ["Death Rate", <FontAwesomeIcon icon={faSort} />],
        field: "death_rate",
        sort: "desc",
        width: 100,
      },
    ],
    rows: dataset.map((country) => {
      const active =
        country.latest_data.confirmed -
        country.latest_data.recovered -
        country.latest_data.deaths;
      return {
        name: country.name,
        confirmed: country.latest_data.confirmed,
        new_cases: country.today.confirmed,
        recovered: country.latest_data.recovered,
        active: active,
        critical: country.latest_data.critical,
        deaths: country.latest_data.deaths,
        new_deaths: country.today.deaths,
        cases_per_mil: country.latest_data.calculated.cases_per_million_population,
        recovery_rate: country.latest_data.calculated.recovery_rate ? country.latest_data.calculated.recovery_rate.toFixed(2) : null,
        death_rate: country.latest_data.calculated.recovery_rate ? country.latest_data.calculated.death_rate.toFixed(2) : null
      };
    }),
  };

  return (
    <div>
      {props.recent.length > 0 ? (
        <MDBDataTable
          striped
          bordered
          small
          data={data}
          pagesAmount={5}
          responsive
          paginationLabel={["Previous", "Next"]}
          order={["confirmed", "desc"]}
          entries={20}
          noBottomColumns
        />
      ) : null}
    </div>
  );
};

export default Stats;
