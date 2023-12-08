import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Pages
import CadastroUsuario from "./pages/CadastroUsuario";
import Login from './pages/Login'
import Posts from "./pages/Posts";

//componentes
import Navbar from "./component/Navbar";

//firebase
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/firebaseConection'

//Hoolk
import { useEffect, useState } from "react";


function App() {
  const [user, setUser] = useState(undefined)

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      setUser(user)
    })
  }, [])

  if(loadingUser){
    return <p>Caregando ...</p>
  }

  return (
    <BrowserRouter>
    <ToastContainer />
    <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro" element={<CadastroUsuario />}/>

          <Route 
            path="/posts" 
            element={user ? <Posts /> : <Login to="/login"/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
