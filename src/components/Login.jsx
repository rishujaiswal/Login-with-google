
import { onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import { firebaseAuth,provider } from "../firebase-config";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const handleGoogleButton = () => {
    signInWithPopup(firebaseAuth, provider).then(result => {
      console.log(result)
      navigate('/')
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Section>
      <div className="container">
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="button">
          <button onClick={handleLogin}>Login</button>
          <span>
            Not a member ? <Link to="/signup">Sign up</Link>
          </span>
          <p>or</p>
          <button className='google_button' onClick={handleGoogleButton}><img className="imggoogle" src="https://raw.githubusercontent.com/codewithas1/FirebaseTutorial/master/src/assets/google.png" alt=''/>Login with Google</button>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
  .container {
    height: 50vh;
    width: 25vw;
    background-color: #2c384a;
    border-radius: 1rem;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    .inputs {
    }
    input {
      background-color: #5c5f63a3;
      border: none;
      font-size: 1.2rem;
      padding: 1rem;
      border-radius: 0.3rem;
      color: white;
      &:focus {
        outline: 1px solid;
        outline-color: #f57c00;
        -moz-outline-radius: 0.3rem;
      }
    }
    .imggoogle{
        width:30px;
        hieght:30px;
    }
    .button {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      a {
        color: #039be5;
        text-decoration: none;
      }
      button {
        background-color: #f57c00;
        border: none;
        color: white;
        padding: 0.5rem 2rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        text-transform: uppercase;
        &:hover {
          background-color: #ffa000;
        }
      }
    }
  }
`;