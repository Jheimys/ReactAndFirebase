//Base da URL: https://api.themoviedb.org/3/

// URL da api:https://api.themoviedb.org/3/movie/now_playing?api_key=46351781a58dd45b6ed0c086acbcb999&language=pt-BR

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
