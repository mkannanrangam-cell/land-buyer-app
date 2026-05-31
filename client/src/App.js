import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import BuyerForm from './pages/BuyerForm';
import Header from './components/Header';
import './styles/app.css';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/buyer-form/:buyerId" component={BuyerForm} />
                <Route path="/buyer-form" exact component={BuyerForm} />
            </Switch>
        </Router>
    );
}

export default App;