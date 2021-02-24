// -----------------------------------------------------------------
// Container component for Login page
// -----------------------------------------------------------------
import { connect } from 'react-redux'
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
)(LoginView)

export default LoginContainer
