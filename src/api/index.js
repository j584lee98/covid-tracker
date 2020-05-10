import axios from "axios";

const url = "https://api.covid19api.com";

export const fetchSummary = async () => {
  try {
    const summary = await axios.get(`${url}/summary`);
    return summary.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchData = async (test) => {
  try {
    const {
      data: { Global, Countries, Date },
    } = await axios.get(`${url}/` + test);
    return { Global, Countries, date: Date };
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const response = await axios.get(`${url}/live/country/south-africa`);

    console.log(response)
  } catch (error) {
    
  }
}
