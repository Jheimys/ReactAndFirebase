import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../server/api";

import { db } from "../../firebase/firebaseConection";

import "./Filme.css";
import { addDoc, collection, getDocs } from "firebase/firestore";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Filme = () => {
  const { id } = useParams();
  // console.log(id);

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "46351781a58dd45b6ed0c086acbcb999",
            language: "pt-BR",
          },
        })
        .then((response) => {
          console.log("Resposta de loadFilme", response.data);
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/home", { replace: true });
          return;
        });
    }

    loadFilme();
  }, [id, navigate]);

  const salvarFilmes = async (filme) => {
    //console.log("Dados do filmes obtido pelo btn Salvar:", filme.title);
    try {

      const filmesCollection = collection(db, "filmes")

      //Verificar se o filme existe na coleção
      const querySnapshort = await getDocs(filmesCollection)
      const filmeExistente = querySnapshort.docs.find((doc) => (
        doc.data().title === filme.title
      ))

      if(filmeExistente){
        toast.warning('Este filme já foi salvo anteriormente.', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const filmeName = await addDoc(collection(db, "filmes"), {
          title: filme.title,
        });

        console.log("Filme salvo no Firestore com ID:", filmeName.id);
        // Show success toast
        toast.success('Filme salvo com sucesso!', {
          position: "top-right",
          autoClose: 1000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Erro ao salvar o filme no Firestore:", error);
      // Show error toast
      toast.error('Erro ao salvar o filme.', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    }
  };

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes ...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <h2>Título original: {filme.original_title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average.toFixed(1)}/ 10</strong>

      <div className="area-buttons">
        <button onClick={() => salvarFilmes(filme)}>Salvar</button>
        <button>
          <a
            href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}
            target="blank"
            rel="noopener noreferrer"
          >
            Trailer
          </a>
        </button>
      </div>

       {/* Render the ToastContainer */}
       <ToastContainer />
    </div>
  );
};

export default Filme;
