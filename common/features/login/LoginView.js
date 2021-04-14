// -----------------------------------------------------------------
// Login page
// -----------------------------------------------------------------
import React from 'react'
// import { render } from 'react-dom'
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from 'react-router-dom';

// react-bootstrap components
import {Form, Col, Button} from "react-bootstrap";
// Rename React-Final-Form's Form component so it doesn't clash with React-Bootstrap's Form
import { Form as FinalForm, Field } from 'react-final-form'

import { getLoginLocal, selectLoginUser } from './loginSlice'
import { RbFormControlAdapter, StyledLabel, StyledControl } from '../../widgets/RbFormAdapter'

import SocialButton, {SOCIAL_FACEBOOK, SOCIAL_GOOGLE} from '../../widgets/SocialButton'
import s from './LoginView.scss'

export const LoginView = () => {
  // Redirect to the home page if we're already logged in
  const currentUser = useSelector(selectLoginUser);
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
    dispatch(getLoginLocal(creds))
  }

  // React Final Form's validation functions return 'undefined' if the field value is valid
  const required = value => (value ? undefined : 'Required')

  return (
    <div className={s.loginPage}>  
      <div className={s.loginBox}>
          <div className={s.loginLogo}>
              <a href="#"><b>Admin</b>LTE</a>
          </div>  {/* /.loginLogo */} 
          <div className={s.loginBoxBody}>
              <p className={s.loginBoxMsg}>Sign in to start your session</p>
              <FinalForm
                onSubmit={onSubmit}
                initialValues={{ username: 'arbidman', remember: true }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (    
                  <Form onSubmit={handleSubmit}> 
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridUsername">
                        <Field name="username" validate={required}>
                          {({ input, meta }) => (
                              <>
                                <StyledLabel>Username</StyledLabel>
                                <StyledControl {...input} type="text" placeholder="Enter username" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                              </>
                          )}
                        </Field>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Field name="password" validate={required}>
                          {({ input, meta }) => (
                              <>
                                <StyledLabel>Password</StyledLabel>
                                <StyledControl {...input} type="text" placeholder="Enter password" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                              </>
                          )}
                        </Field>
                      </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit" disabled={submitting || pristine}>
                        Sign In
                    </Button>

{/*                     <div className="form-group has-feedback">
                      <Field name="username" component="input" type="text" placeholder="Username" className="form-control"/>
                      <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                      <Field name="password" component="input" type="password" placeholder="Password" className="form-control"/>
                      <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div> */}
{/*                     <div className="row">
                        <div className="col-xs-8">
                            <div className="checkbox icheck">
                                <label>Remember Me</label>
                                <Field name="remember" component="input" type="checkbox" />
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <button type="submit" className="btn btn-primary btn-block btn-flat" disabled={submitting || pristine}>
                                Sign In Now
                            </button>
                        </div>
                      </div> */}
{/*                     <div>
                      <label>First Name</label>
                      <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                      />
                    </div> */}
{/*                     <div className="buttons">
                      <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </button>
                    </div> */}
                    
                  </Form>
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

/* export const Logout = () => {
  const { userData: currentUser } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();

  const LogoutCb = () => {
    console.log ("Logout user data is ", currentUser);
    if (currentUser) {
      logoutReqAction (dispatch);
      history.push("/");
    }
  }

  return ( 
    <NavItem>
      <NavLink href="#" onClick={LogoutCb}>No User</NavLink>
    </NavItem>
  )
}
 */
