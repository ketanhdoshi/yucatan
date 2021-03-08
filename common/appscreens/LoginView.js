// -----------------------------------------------------------------
// Container component for Login page
// -----------------------------------------------------------------
import React from 'react'
import { render } from 'react-dom'
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router-dom';
import { Form, Field } from 'react-final-form'

// Action helpers
import { localLoginReqAction,
         logoutReqAction 
} from '../actions/action.js'

import SocialButton, {SOCIAL_FACEBOOK, SOCIAL_GOOGLE} from '../widgets/SocialButton'
import s from '../scss/LoginView.scss'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmitOld = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

export const LoginView = () => {
  // Redirect to the home page if we're already logged in
  const { userData: currentUser } = useSelector((state) => state.login);
  console.log ("Login View, user data is ", currentUser);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  const dispatch = useDispatch();
  const onSubmit = async values => {
    console.log ('Doing Local Login')
    const creds = {
      username: values.username,
      password: values.password
    }
    localLoginReqAction (creds, dispatch)
    window.alert(JSON.stringify(values, 0, 2))
  }  

  return (
    <div className={s.loginPage}>  
      <div className={s.loginBox}>
          <div className={s.loginLogo}>
              <a href="#"><b>Admin</b>LTE</a>
          </div>  {/* /.loginLogo */} 
          <div className={s.loginBoxBody}>
              <p className={s.loginBoxMsg}>Sign in to start your session</p>
              <Form
                onSubmit={onSubmit}
                initialValues={{ username: 'arbidman', remember: true }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (            
                  <form onSubmit={handleSubmit}>
                    <div className="form-group has-feedback">
                      <Field name="username" component="input" type="text" placeholder="Username" className="form-control"/>
                      <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                      <Field name="password" component="input" type="password" placeholder="Password" className="form-control"/>
                      <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div className="row">
                        <div className="col-xs-8">
                            <div className="checkbox icheck">
                                <label>Remember Me</label>
                                <Field name="remember" component="input" type="checkbox" />
                            </div>
                        </div> {/* /.col */}
                        <div className="col-xs-4">
                            <button type="submit" className="btn btn-primary btn-block btn-flat" disabled={submitting || pristine}>
                                Sign In Now
                            </button>
                        </div> {/* /.col */}
                      </div>
                    <div>
                      <label>First Name</label>
                      <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="buttons">
                      <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </button>
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                  </form>
                )}
              />
              <div className={s.socialAuthLinks + " text-center"}>
                  <p>- OR -</p>
                  <SocialButton type={SOCIAL_FACEBOOK} />
                  <SocialButton type={SOCIAL_GOOGLE} />
              </div> {/* /.social-auth-links */}
              <a href="#">I forgot my password</a><br />
              <a href="#" className="text-center">Register a new membership</a>
          </div> {/* /.loginBoxBody */}
      </div>                
    </div>
  );
}

export const LogoutCb = () => {
  const userData = useSelector((state) => state.login);
  if (userData) {
    const dispatch = useDispatch();
    logoutReqAction (dispatch);
  }

  // Redirect to the home page if we're already logged in
  // return <Redirect to="/" />;
}
