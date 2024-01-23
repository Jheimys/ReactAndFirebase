//firebase
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../firebase/firebaseConection'

//Hoolk
import { useEffect, useState } from "react"

const useAuth = () => {
    const [user, setUser] = useState(undefined);
    const loadingUser = user === undefined;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          
          const userData = {
            uid: user.uid,
            email: user.email
          }
          
          localStorage.setItem("@userDetail", JSON.stringify(userData))

          setUser(user);
        });
    
        // Cleanup
        return () => unsubscribe();

    }, []);
    
    return { user, loadingUser };
};
    

export default useAuth