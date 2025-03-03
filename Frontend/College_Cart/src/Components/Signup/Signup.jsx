import React, { useState, useEffect } from 'react';
import styles from './signup.module.css';
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
  const { status, user, token,isLoading } = useSelector((state) => state.app);
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false)
  // const [isLoadingCode, setIsLoadingCode] = useState(false)
  
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
      // setIsLoading(true)
      setError('');
    } catch (err) {
      setError('Failed to create an account. Please try again.'); 
      // setIsLoading(false)
    }
  };
 
  const verifyEmailAccount = async (e) => {
    e.preventDefault();
    try {
      dispatch(emailVerify({ email, code }));
      // isLoading(true)
      setError('');
      // setIsLoadingCode(true)
    } catch (err) {
      setError('Verification failed. Please check the code and try again.');
      // setIsLoadingCode(false)
    }
  };
  useEffect(()=>{
    if(status==='success' && user && token){
      setTimeout(()=>{ navigate("/dashboard")},2000)
    }
    // if (status === 'failed') {
    //   setIsLoading(false);
    // }

  },[status,navigate])

   

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.signupText}>Signup</p>
        <p className={styles.textInformation}>Enter your information to create an account</p>

        <div className={styles.nameContainer}>
          <label htmlFor="name" className={styles.name}>Name</label><br />
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

        <div className={styles.usernameContainer}>
          <label htmlFor="username" >Username</label><br />
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

        <div className={styles.emailContainer}>
          <label htmlFor="email" className={styles.email} style={{color:"white"}}>Email</label><br />
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

        <div className={styles.passwordContainer}>
          <label htmlFor="password" className={styles.password}>Password</label><br />
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

        <div className={styles.btnContainer}>
          <button type="submit" disabled={isLoading && !name}>{isLoading && status === 'loading' ? 'Account Verification...' : "Account Verification"}</button>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.alreadyAccountContainer}>
          <p className={styles.alreadyAccount}>
            Already have an account?<span className={styles.alreadySignin} onClick={() => navigate('/login')}> Sign in</span>
          </p>
        </div>
        {verificationShowInput && (
          <div className={styles.verificationOverlay}>
            <div className={styles.verificationDialog}>
              <button className={styles.closeButton} onClick={() => setVerificationShowInput(false)}>×</button>
              <h3 className={styles.verificationTitle}>Email Verification</h3>
              <p className={styles.verificationMessage}>
                A verification code has been sent to {email}
              </p>
              <input
                id="code"
                className={styles.verificationInput}
                placeholder="Enter verification code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className={styles.createAccountContainer}>
                <button onClick={verifyEmailAccount} className={styles.createAccount}>
                  {isLoading && status==='loading' ? 'Create account...' : 'Create account'}
                </button>
              </div>
              <div className={styles.resendText}>
                Didn't receive the code?{' '}
                <button className={styles.resendButton} onClick={handleSubmit}>
                  Resend
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
      <MessageHandler />
    </div>
  );
};

export default Signup;