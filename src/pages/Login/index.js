import { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css"

function Login() {
    const [email, setEmail] = useState('')
    const[senha, setSenha] = useState('')

    async function login(){
        alert('teste')
    }

    return (
      <div className="container">
        <h1>Explorando React com Firebase</h1>
        <h2>Login</h2>
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
            placeholder="Digite sua senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            />
            <button onClick={login}>Entar</button>  
        </form>
        <p>
        Ainda não tem uma conta?{" "}
        <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
      </div>
    );
  }
  
  export default Login;