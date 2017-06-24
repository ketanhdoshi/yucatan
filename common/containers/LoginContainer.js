// -----------------------------------------------------------------
// Container component for Login page
// -----------------------------------------------------------------
import { connect } from 'react-redux'
import LoginView from '../components/LoginView'

function myDummy () {
    console.log ("myDummy")
}

const mapStateToProps = (state) => ({
   user: "great",
   name: "my name"
})

const mapDispatchToProps =  ({
  onDummyClick: myDummy
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView)

export default LoginContainer
