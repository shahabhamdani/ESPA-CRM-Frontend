import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
    <Login/>
    </BrowserRouter>
  );
}

export default App;
