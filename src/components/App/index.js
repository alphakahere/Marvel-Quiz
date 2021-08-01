import '../../App.css';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Footer from '../Footer/Footer';
import Welcome from '../Welcome/Welcome';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import ErrorPage from '../Error/ErrorPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route component={ErrorPage} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
