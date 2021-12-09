import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Authentication/Login';
import HeaderComponent from './Components/Header/HeaderComponent';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
    <HeaderComponent/>
    </BrowserRouter>
  );
}

export default App;
