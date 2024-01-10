import { apiClient } from "./ApiClient"

export const executeBasicAuthenticationService = (token) => apiClient.get(`basicauth`, {
    headers: {
        Authorization: token
    }
})

//Llamamos al POST http://localhost:8080/authenticate  con user y pass como objeto para que genere el Token JWT
export const executeJwtAuthenticationService = (username, password) => 
    apiClient.post(`authenticate`, {username, password}
)