// -----------------------------------------------------------------
// Presentational component for Login page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import SocialButton, {SOCIAL_FACEBOOK, SOCIAL_GOOGLE} from './widgets/SocialButton'

import s from '../scss/LoginView.scss'

// -----------------------------------------------------------------
//      NOTE - TODO TODO TODO TODO
// 
// The styling for the form elements and the buttons needs to be updated
// to match the original AdminLTE styling. Also classes like btn-flat have
// to be added
// -----------------------------------------------------------------


const LoginView = (user, name, onDummyClick) => (
    <div className={s.loginPage}>  
        <div className={s.loginBox}>
            <div className={s.loginLogo}>
                <a href="#"><b>Admin</b>LTE</a>
            </div>  {/* /.loginLogo */} 
            <div className={s.loginBoxBody}>
                <p className={s.loginBoxMsg}>Sign in to start your session</p>

                <form action="../../index2.html" method="post">
                    <div className="form-group has-feedback">
                        <input type="email" className="form-control" placeholder="Email" />
                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                        <input type="password" className="form-control" placeholder="Password" />
                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div className="row">
                        <div className="col-xs-8">
                            <div className="checkbox icheck">
                                <label>
                                    <input type="checkbox" /> Remember Me
                                </label>
                            </div>
                        </div> {/* /.col */}
                        <div className="col-xs-4">
                            <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                        </div> {/* /.col */}
                    </div>
                </form>

                <div className={s.socialAuthLinks + " text-center"}>
                    <p>- OR -</p>
                    <SocialButton type={SOCIAL_FACEBOOK}/>
                    <SocialButton type={SOCIAL_GOOGLE}/>
                </div> {/* /.social-auth-links */}
                <a href="#">I forgot my password</a><br />
                <a href="#" className="text-center">Register a new membership</a>
            </div> {/* /.loginBoxBody */}
        </div>                
    </div>
)

LoginView.propTypes = {
    user: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onDummyClick: PropTypes.func.isRequired
}

export default LoginView
