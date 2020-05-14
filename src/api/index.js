import axios from "axios";

const url = "https://corona-api.com";

export const fetchGlobal = async () => {
  try {
    const res = await axios.get(`${url}/timeline`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchCountries = async () => {
  try {
    const res = await axios.get(`${url}/countries`);
    const countries = res.data.data.map(country => {
      return {
        name: country.name,
        code: country.code
      }
    })
    return countries;
  } catch (error) {
    console.log(error);
  }
}

export const fetchCountry = async (code) => {
  try {
    const res = await axios.get(`${url}/countries/` + code);
    const data = {
      name: res.data.data.name,
      timeline: res.data.data.timeline
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecent = async (code) => {
  try {
    const res = await axios.get(`${url}/countries`);
    const data = res.data.data.map(country => {
      return {
        name: country.name,
        today: country.today,
        latest_data: country.latest_data
      }
    })
    return data;
  } catch (error) {
    console.log(error);
  }
};
