import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hoolk/useAuth";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConection";

import "./Navbar.css";

const Navbar = () => {
  const { user, loadingUser } = useAuth();
  const navigate = useNavigate();

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      // Redireciona o usuário para a página de login após o logout
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
      // Trate o erro conforme necessário (pode mostrar uma mensagem para o usuário, por exemplo)
    }
  }

  return (
    <nav className="navbar">
      <span>ReactFlix</span>
      <ul>
        {!user && (
          <>
            <li>
              <Link to="/">Login</Link>
            </li>
          </>
        )}

        {!user && (
          <>
            <li>
              <Link to="/cadastro">Cadastrar</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <Link to="/conta">Minha conta</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <button onClick={handleLogout}>Sair</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
