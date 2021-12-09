import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../App.css';
import HeaderComponent from './Header/HeaderComponent';

function App() {
  return (
    <BrowserRouter>
    <HeaderComponent/>
    </BrowserRouter>
  );
}

export default App;
