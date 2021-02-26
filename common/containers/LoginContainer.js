// -----------------------------------------------------------------
// Container component for Login page
// -----------------------------------------------------------------
/* import { connect } from 'react-redux'
import LoginView from '../components/widgets/LoginView'

// Action helpers
import { localLoginReqAction } from '../actions/action.js'

function myDummy (e, msg) {
  e.preventDefault();
  console.log (msg)
}

const mapStateToProps = (state) => ({
   user: "great",
   name: "my name"
})

const mapDispatchToProps = (dispatch) =>  ({
  onLoginLocalCb: (e) => {
    e.preventDefault();
    console.log ('Doing Local Login')
    const creds = {
      username: 'arbidman',
      password: 'sunderman'
    }
    localLoginReqAction (creds, dispatch)
  },
  onLoginGoogleCb: (e) => { 
    myDummy (e, "Google Sign In")
  },
  onLoginFBCb: (e) => { 
    myDummy (e, "FB Sign In")
  }
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView) */

import React from 'react'
import { render } from 'react-dom'
import { useDispatch, useSelector } from "react-redux"
import { Form, Field } from 'react-final-form'

// Action helpers
import { localLoginReqAction } from '../actions/action.js'

import SocialButton, {SOCIAL_FACEBOOK, SOCIAL_GOOGLE} from '../components/widgets/SocialButton'
import s from '../scss/LoginView.scss'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmitOld = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const LoginContainer = () => {
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

export default LoginContainer

/* const LoginContainer = () => (
  <div>
    <h1>React Final Form - First Example</h1>
    <Form
      onSubmit={onSubmit}
      initialValues={{ stooge: 'larry', employed: false }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
      
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div>
            <label>Employed</label>
            <Field name="employed" component="input" type="checkbox" />
          </div>
          <div>
            <label>Best Stooge</label>
            <div>
              <label>
                <Field
                  name="stooge"
                  component="input"
                  type="radio"
                  value="larry"
                />{' '}
                Larry
              </label>
            </div>
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
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
  </div>
) */

