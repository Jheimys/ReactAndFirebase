import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConection";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado com sucesso!");
      toast.success("Usuário logado com sucesso!");

      navigate("/home");
    } catch (error) {
      console.error("Erro ao logar:", error.message);
      // Adicione feedback visual para o usuário, se necessário.
      toast.error(`Erro ao logar: ${error.message}`);
    }
  }

  return (
    <div className="container">
      <h1>Explorando React com Firebase</h1>
      <h2>Login</h2>
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
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button>Entar</button>
      </form>
      <p>
        Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
    </div>
  );
}

export default Login;
