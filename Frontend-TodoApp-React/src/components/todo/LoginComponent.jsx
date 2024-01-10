import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from './security/AuthContext';

function LoginComponent () {
    const [username, setUsername] = useState("in28minutes")
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(null);

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsername (event) {
        setUsername(event.target.value) 
    }

    async function handleSubmit (e) {
        e.preventDefault(); //Prevuene del comportamiento por defecto de recargar la página en el envío del form

        try {
            if(await authContext.login(username, password)){            
                setLoginSuccess(true); 
                navigate(`/welcome/${username}`)
            } else {
                setLoginSuccess(false);
            }
        } catch (error) {
            console.log(error)
            setLoginSuccess(false);
        }

      };

    return (
        <div className="Login">
            <div className="LoginForm">
                <form onSubmit={handleSubmit}>
                     {/* Condición para mostrar el mensaje de éxito o error */}
                     {loginSuccess !== null && (
                            <div className="LoginMessageClass">
                                {!loginSuccess && 'Autenticación fallida. Por favor revisa tus credenciales.'}                                
                            </div>
                        )}

                <div>
                    <label htmlFor="username">Usuario:</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsername}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                    type="password"
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}             
                    />
                </div>
                <button type="submit" >Iniciar sesión</button>
                </form>
            </div>
        </div>
    )
}

export default LoginComponent