import React, { useState } from 'react';
import styled from 'styled-components';
import BgImage from '../components/BgImage';
import Header from '../components/Header';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../utils/Firebase-Config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formvalues, setFormvalues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      //This helps to store the user into the Firebase Database 
      const { email, password } = formvalues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/');
  });

  return (
    <Container>
      <BgImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder='Email Address'
                name='email'
                value={formvalues.email}
                onChange={(e) => setFormvalues({ ...formvalues, [e.target.name]: e.target.value })} />
              <input
                type="password"
                placeholder='Password'
                name='password'
                value={formvalues.password}
                onChange={(e) => setFormvalues({ ...formvalues, [e.target.name]: e.target.value })} />
              <button onClick={handleSubmit}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login;


const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;