import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hoolk/useAuth";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConection";

import "./Navbar.css";

import logo from "../../img/reactflix30.png";

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
      <div className="logo">
        <img
          className="img-logo"
          src={logo}
          alt="Logo do reactflix"
          onClick={() => navigate("/home")}
        />
      </div>

      <div className="container-lis">
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
      </div>
    </nav>
  );
};

export default Navbar;
