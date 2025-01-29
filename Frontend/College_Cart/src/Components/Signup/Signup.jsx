import React, { useState, useEffect } from 'react';
import './signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { emailVerify, signUpUser } from '../SagaRedux/Slice';
import MessageHandler from './MessageHandler';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [verificationShowInput, setVerificationShowInput] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { status ,user,token,isLoading} = useSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      setVerificationShowInput(true);
      setName('')
      setUserName('')
      // setEmail('')
      setPassword('')
    }
    // console.log(user)
    // console.log(token)
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       dispatch(signUpUser({ name, username, email, password }));
      setError('');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
  };

  const verifyEmailAccount = async (e) => {
    e.preventDefault();
    try {
       dispatch(emailVerify({email, code }));
      setError('');
    } catch (err) {
      setError('Verification failed. Please check the code and try again.');
    }
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <p className="signupText">Signup</p>
        <p className="textInformation">Enter your information to create an account</p>

        <div className="nameContainer">
          <label htmlFor="name" className="name">Name</label><br />
          <input
            id="name"
            name="name"
            placeholder="John"
            type="text"
           // required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="usernameContainer">
          <label htmlFor="username" className="username">Username</label><br />
          <input
            id="username"
            name="username"
            placeholder="John123"
            type="text"
          //  required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="emailContainer">
          <label htmlFor="email" className="email">Email</label><br />
          <input
            id="email"
            name="email"
            placeholder="@example.com"
            type="email"
          //  required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="passwordContainer">
          <label htmlFor="password" className="password">Password</label><br />
          <input
            id="password"
            name="password"
            placeholder="password"
            type="password"
          //  required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="btnContainer">
          <button type="submit">{isLoading ? '...Loading' : "Account Verification"}</button>
        </div>

        {error && <p className="errorMessage">{error}</p>}

        <div className="alreadyAccountContainer">
          <p className="alreadyAccount">
            Already have an account?<span className="alreadySignin" onClick={()=>navigate('/login')}> Sign in</span>
          </p>
        </div>
        {verificationShowInput && (
        <div className="codeContainer">
          {/* <label htmlFor="code" className="code">Verification Code</label><br /> */}
          <input
            id="code"
            placeholder="Enter code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="createAccountContainer">
            <button onClick={verifyEmailAccount} className="createAccount">Create account</button>
          </div>
        </div>
      )}
      </form> 
      <MessageHandler />
    </div>
  );
};

export default Signup;
