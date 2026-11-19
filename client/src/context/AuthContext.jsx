import React from 'react'
import { createContext, useState, useEffect } from 'react'
import api from '../services/api'


export const AuthContext = createContext(null)

const AuthContext = ({children}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const [token, setToken]=useState(localStorage.getItem("token")||null)

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const checkAuth = async()=>{
        if(!token){
            setLoading(false);
            return;
        }

        try{
            const response = await api.get("/users/userprofile")
            setUser(response.data.user)
        }
        catch(error){
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setToken(null);
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    }
    checkAuth();
  },[])

    // Login
  const login = (newToken, userData) => {

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);
  };

  // Logout
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token)

  return(
    <AuthContext.Provider value={{user, token, loading, isAuthenticated, login, logout}}>{children}</AuthContext.Provider>
  )
}

export default AuthContext