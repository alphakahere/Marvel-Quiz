import '../../App.css';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Footer from '../Footer/Footer';
import Welcome from '../Welcome/Welcome';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import ErrorPage from '../Error/ErrorPage';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {IconContext} from 'react-icons'
function App() {
  
  return (
    <Router>
      <Header />

      <Switch>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          <Route exact path="/" component={Landing} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgetpassword" component = {ForgetPassword} />
        </IconContext.Provider>

        <Route component={ErrorPage} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
