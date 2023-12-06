import { useState } from "react";
import {auth } from'../../firebase/firebaseConection'
import { createUserWithEmailAndPassword } from "firebase/auth";

const CadastroUsuario = () => {

    const [email, setEmail] = useState('')
    const[senha, setSenha] = useState('')
    const [confirmacaoDeSenha, setConfirmacaoDeSenha] = useState('')
  
    async function cadastroUsuario(){
  
      if(senha !== confirmacaoDeSenha){
        console.error('Erro: A senha e a confirmação de senha não são iguais')
        return
      }
  
      try{
        await createUserWithEmailAndPassword(auth, email, senha)
        console.log('Usuário cadastrado')
      }
      catch(error){
          console.log('Usuário não cadastrado', error)
      }
  
    }
  
  return (
    <div>
        <h1>Explorando React com Firebase</h1>
      <form>
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
          placeholder="Digite sua senha" 
          value={confirmacaoDeSenha}
          onChange={(e) => setConfirmacaoDeSenha(e.target.value)}
          required
        />
        <button onClick={cadastroUsuario}>cadastar</button>
      </form>
    </div>
  )
}

export default CadastroUsuario