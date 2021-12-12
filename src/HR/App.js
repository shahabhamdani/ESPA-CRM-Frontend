import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderComponent from './Header/HeaderComponent';
import './App.css';
function App() {
  return (
    <BrowserRouter>
    <HeaderComponent/>
    </BrowserRouter>
  );
}

export default App;
