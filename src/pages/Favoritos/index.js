import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Favoritos.css'


const Favoritos = () => {

  const [favorito, setFavorito] = useState([])
  const [user, setUser] = useState({})
  console.log(user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const userDetail = localStorage.getItem("@userDetail")
      setUser(JSON.parse(userDetail))

      
      if(userDetail){
        const infoUser = JSON.parse(userDetail)
        console.log(infoUser.uid)
        const filmeRef = collection(db, "filmes")
        const q = query(filmeRef, where("userUid", "==", infoUser.uid))
        const querySnapshort = await getDocs(q)
       
        let filmesFavoritos = []
        
        querySnapshort.forEach((doc) => {
          const filmeData = doc.data();
          filmesFavoritos.push({ ...filmeData, id: doc.id }); // Inclua o ID do documento
        })
        
        setFavorito(filmesFavoritos)

      }
    }

    fetchData()
  }, [])


  const handleExcluir = async(filmeId) => {
    console.log("excluir:", filmeId)
    try {
      await deleteDoc(doc(db, "filmes", filmeId))
      setFavorito((excluirFavorito) => {
        console.log("excluirFavorito:", excluirFavorito);
         return excluirFavorito.filter((filme) => filme.id !== filmeId )
      })
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
    }
  }

  return (
    <div className="favoritos-container">
      <h1>Meus Filmes Favoritos</h1>
      {favorito.map((filme) => ( 
        <div key={filme.id} className="favoritos-item">
          <h3>{filme.title}</h3>
          <div className="favoritos-item-btn">
            <button onClick={() => handleExcluir(filme.id)}>Excluir</button>
            <button onClick={() => navigate(`/filme/${filme.filmeId}`)}>Informação</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Favoritos