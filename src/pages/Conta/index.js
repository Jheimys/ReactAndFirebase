import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState } from "react";
import { storage } from "../../firebase/firebaseConection";

import "./Conta.css";

const Conta = () => {
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [fotoUrl, setFotoUrl] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("pagina de conta", user);
      setUid(user.uid);
      setEmail(user.email);
      setNome(user.displayName);
      setFotoUrl(user.photoURL || null);
    } else {
      //user is sinned out
    }
  });

  const handleFotoChange = async (event) => {
    const novaFoto = event.target.files[0];

    // Lógica para fazer upload da nova foto
    const storageRef = ref(storage, `profilePictures/${uid}`);
    await uploadBytes(storageRef, novaFoto);

    const novaFotoUrl = await getDownloadURL(storageRef);

    // Atualizar a foto no perfil do usuário
    await updateProfile(auth.currentUser, { photoURL: novaFotoUrl });

    // Atualizar o estado local da foto
    setFotoUrl(novaFotoUrl);
  };

  return (
    <div className="conta-container">
      <h2> Minha conta </h2>
      {fotoUrl && (
        <img className="foto-perfil" src={fotoUrl} alt="Foto de Perfil" />
      )}

      <label htmlFor="alterarImagemInput" className="alterar-imagem-label">
        Alterar Imagem
      </label>

      <input
        type="file"
        onChange={handleFotoChange}
        accept="image/*"
        style={{ display: "none" }} // Oculta o input de arquivo nativo
        id="alterarImagemInput"
      />

      <p>
        {" "}
        <span className="span-conta">Nome:</span> {nome}
      </p>
      <p>
        {" "}
        <span className="span-conta">Email:</span> {email}
      </p>
      <p>
        {" "}
        <span className="span-conta">ID do usuário:</span> {uid}
      </p>
    </div>
  );
};

export default Conta;
