import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

//1 Create a Context
export const AuthContext = createContext()

//3 Allows to share the context in your components using hooks. Its like a static constant in Java
export const useAuth = () => useContext(AuthContext)

//2 Component to share the createContext
export default function AuthProvider ({children}) {
    
    //is user authenticated
    const [isAuthenticated, setAuthenticated ]= useState(false);

    const [userName, setUserName ] = useState(null); //IMP. La constante userName debe escribirse tal cual en los otros componentes q la usen


    const [token, setToken ] = useState(null); //Estado para guardar el token y pasarlo por contexto

/*     function login(username, password) {
        if (username === 'in28minutes' && password === '1234') {
            setAuthenticated(true)
            setUserName(username)
            return true;
        } else {
            setAuthenticated(false)
            setUserName(null)
            return false;
        }
    } */

/*     async function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username + ":" + password) //Crea el Token en base64

        const response = await executeBasicAuthenticationService(baToken)


            if (response.status == 200) {
                setAuthenticated(true)
                setUserName(username)
                setToken(baToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('Intercepting and adding the authentication Token')
                        config.headers.Authorization = baToken
                        return config
                    }
                )

                return true;
            } else {
                logout()
                return false;
            }
        
    } */

    async function login(username, password) {

        const response = await executeJwtAuthenticationService(username, password)

        if (response.status == 200) {
            setAuthenticated(true)
            setUserName(username)

            const jwtToken = 'Bearer ' + response.data.token
            setToken(jwtToken)

            apiClient.interceptors.request.use(
                (config) => {
                    console.log('Intercepting and adding the authentication Token')
                    config.headers.Authorization = jwtToken
                    return config
                }
            )

            return true;
        } else {
            logout()
            return false;
        }
        
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUserName(null)
    }

    //In value pass as an Object all properties to keep them visible in the context
    //IMP: Los nombres compartidos en el value debe escribirse tal cual a la hora de recuperarlos desde otros componentes
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userName, token}}>            
            {children}
        </AuthContext.Provider>
    )
}     