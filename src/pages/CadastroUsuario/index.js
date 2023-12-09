import { useState } from "react";
import {auth } from'../../firebase/firebaseConection'
import { createUserWithEmailAndPassword } from "firebase/auth";

import './CadastroUsuario.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CadastroUsuario = () => {

    const [email, setEmail] = useState('')
    const[senha, setSenha] = useState('')
    const [confirmacaoDeSenha, setConfirmacaoDeSenha] = useState('')

    const navigate = useNavigate()
  
    async function handleSubmit(e){
       e.preventDefault()

      if(senha !== confirmacaoDeSenha){
        toast.error(`As senhas devem ser iguais`)
        return
      }
  
      try{
        await createUserWithEmailAndPassword(auth, email, senha)
        toast.success('Usuário cadastrado com sucesso!')
        navigate('/posts')
      }
      catch(error){
          console.log('Usuário não cadastrado', error)
      }
  
    }
  
  return (
    <div className="container_cadastro">
        <h1>Explorando React com Firebase</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="text" 
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha</label>
        <input 
          type="password" 
          placeholder="Digite sua senha de 6 digitos" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <label>Confirmação de senha</label>
        <input 
          type="password" 
          placeholder="Confime sua senha sua senha" 
          value={confirmacaoDeSenha}
          onChange={(e) => setConfirmacaoDeSenha(e.target.value)}
          required
        />
        <button>cadastar</button>
      </form>
    </div>
  )
}

export default CadastroUsuario