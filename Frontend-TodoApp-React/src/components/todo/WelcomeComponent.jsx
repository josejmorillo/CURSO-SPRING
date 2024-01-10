import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { retrieveHelloWorldBean, retrieveHelloWorldBeanPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

function WelcomeComponent () {

    const {username} = useParams()
    const [message, setApiResponse] = useState(null);

    const authContext = useAuth();

    function callHelloWorldRestApi() {
        console.log('called')

        //retrieveHelloWorldBean()
        retrieveHelloWorldBeanPathVariable("joselito", authContext.token)
        .then((response) => successFulResponse(response))
        .catch((error) => errorResponse(error))
        .finally (() => console.log('cleanup'))
    }

    function successFulResponse(response) {
        console.log(response)
        //setApiResponse(response.data)
        setApiResponse(response.data.message)
    }

    function errorResponse(response) {
        console.log("ERROR ->" + response)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Go to you TODO list <Link to='/todos'>here</Link>
            </div>
            <div>
                <button className="btn btn-success m5" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div>
                {message}
            </div>
        </div>
    )
}


export default WelcomeComponent