import React, {useState} from "react"
import './Login.css'
import { Link, useHistory } from "react-router-dom"
import {db, auth} from "./firebase"

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault()
            // some fancy firebase login stuff

            auth
                .signInWithEmailAndPassword(email, password)
                .then(auth => {
                    history.push('/')
                })
                .catch(error => alert(error.message))
    }
    
    const register = (e) => {
        e.preventDefault()
            // some fancy firebase login stuff
            auth
                .createUserWithEmailAndPassword(email, password)
                . then((auth) => {
                    // it successfully creates a new user with email id and password
                    if (auth) {
                        history.push('/')
                    }
                })
                .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to = '/'>
            <img 
            className='login_logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
            </Link>

            <div className="login_container">
                <h1>Sign-In</h1>
                <form action="">
                    <h5>Email</h5>
                    <input 
                    type="text"
                    value= {email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input 
                    type="password"  
                    value= {password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button
                        type= 'submit'
                        className='login_signInButton'
                        onClick={signIn}
                    >Sign-In
                    </button>
                </form>
                <p>
                    By sigining-in you are greeing to AMAZON FAKE CLONE's Conditions of use and sale. Please see our privacy notice, our cookies notice and our Interest-Based Ads
                </p>
                <button
                onClick={register}
                className='login_registerButton'
                >Create your Amazon Account</button>
            </div>

        </div>

    )
}

export default Login
