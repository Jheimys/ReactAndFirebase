import { useEffect } from "react";
import { useState } from "react";
import api from "../../server/api";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "46351781a58dd45b6ed0c086acbcb999",
          language: "pt-BR",
        },
      });

      // console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results);
    }

    loadFilmes();
  }, []);

  return (
    <div>
      <div className="lista-filmes">
        {filmes.map((filme) => (
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            <img
              src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
              alt={filme.title}
            />
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
