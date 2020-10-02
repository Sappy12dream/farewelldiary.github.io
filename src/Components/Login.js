import React from "react";

import { FcGoogle } from "react-icons/fc";

function Login({
  email,
  setemail,
  password,
  setpassword,
  handleLogin,
  handleSignup,
  hasAaccount,
  sethasAaccount,
  emailError,
  passwordError,
  googleLogin
}) {
  return (
    <div className="login__body flex v-center center">
      <form>
      <div
        className="login__container flex
      v-center center"
      >
        <div className="login__header">
          <h1>Sign up for free</h1>
          <p>Get started to create a memory</p>
        </div>
        <div className="login__googlebtn">
          <button className="google__btn flex v-center" onClick={googleLogin}>
            <FcGoogle className="google__icon" />
            {hasAaccount ? (
              <p>Sign in with Google</p>
            ) : (
              <p>Sign up with Google</p>
            )}
          </button>
        </div>
        <div className="login__divider flex v-center">
          <div className="line1 line"></div>
          <p>or sign {hasAaccount ? "in" : "up"} with Email</p>
          <span className="line2 line"></span>
        </div>
        <div className="login__input flex">
          <label>Email address</label>
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Eg: sappy12dream@gmail.com"
          />
          <p>{emailError}</p>
        </div>
        <div className="login__input flex">
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="type your password here..."
            autoComplete="true"
          />
          <p>{passwordError}</p>
        </div>

        {hasAaccount ? (
          <>
            <button onClick={handleLogin} className="login__btn">sign in</button>
            
            <p className="text flex v-center">
              Don't have an account?
              <button onClick={() => sethasAaccount(!hasAaccount)} className="text__btn">
                sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <button onClick={handleSignup} className="login__btn">sign up</button>
            <p className="text flex v-center">
              Already Have an account?
              <button onClick={() => sethasAaccount(!hasAaccount)} className="text__btn">
                sign in
              </button>
            </p>
          </>
        )}
      </div>
      </form>
    </div>
  );
}

export default Login;
