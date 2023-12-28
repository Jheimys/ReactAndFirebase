import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favoritos = () => {

  const [favorito, setFavorito] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "filmes"), where("title", "!=", ""))
        const querySnapshort = await getDocs(q)

        //console.log("consulta no BD: ",querySnapshort)
        const filmesFavoritos = []

        querySnapshort.forEach((doc) => {
          const filme = doc.data()
          filmesFavoritos.push({id: doc.id, ...filme})
        })
        
        console.log(`Filmes favoritos:`, filmesFavoritos)
        setFavorito(filmesFavoritos)

      } catch (error) {
        console.error("Erro ao buscar filmes favoritos:", error);
      }
    }

    fetchData()
  }, [])


  const handleExcluir = async(filmeId) => {
    console.log("excluir:", filmeId)
    try {
      await deleteDoc(doc(db, "filmes", filmeId))
      setFavorito((excluirFavorito) => {
         return excluirFavorito.filter((filme) => filme.id !== filmeId )
      })
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
    }
  }

  return (
    <div>
      {favorito.map((filme) => ( 
        <div key={filme.id}>
          <h2>{filme.title}</h2>
          <button onClick={() => handleExcluir(filme.id)}>Excluir</button>
          <button onClick={() => navigate("/home")}>Voltar para Home</button>
        </div>
      ))}
    </div>
  )
}

export default Favoritos