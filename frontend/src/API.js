import axios from 'axios';

var baseURL;

baseURL = 'http://127.0.0.1:8000';
const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default class API {
    getPlaces = async (search, category) => {
      let url = "/places/";
      let query = new URLSearchParams();
      if (search) {
        query.append("search", search);
      }
      if (category) {
        query.append("category", category);
      }
  
      if (query.toString() !== "") {
        url += "?" + query.toString();
      }
  
      const places = await api
        .get(url)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(error);
        });
      return places.results;
    };
    getCategories = async () => {
      const categories = await api
        .get("/category/")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(error);
        });
      return categories.results;
    };
  }