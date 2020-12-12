import React,{useState}  from 'react';
import './Login.css'
import {Link, useHistory} from 'react-router-dom'
import {auth} from './firebase'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn=(e)=>{
        // prevents page from refreshing
        e.preventDefault();
        // firebase login auth
        auth.signInWithEmailAndPassword(email,password)
        .then(auth =>{
            console.log(auth)
            if(auth){
                history.push('/')
            }
        })
        .catch(error=>alert(error.message))

    }

    const register=(e)=>{
        e.preventDefault();
        // firebase
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            console.log(auth)
            if (auth){
                history.push('/')
            }
        })
        .catch(error=>alert(error.message))

    }

    return (
        <div className="login">
            <Link to="/">
                <img className='login__logo' src = "https://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" alt ="amazon_logo"/>
            </Link>

            <div className="login__container">
                <h1>Sign-In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}></input>

                    <button className="login__signInButton" type="submit" onClick={signIn}>Sign In</button>
                </form>
                <p> By signing-in you agree to the AMAZON CLONE conditions of use and sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice</p>

                {/* <input type="checkbox"/>Keep me signed in. */}
                <button className='login__registerButton' onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
        
    )
}

export default Login
