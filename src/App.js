import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginFrom from './components/LoginFrom';
import SignInForm from './components/SignInForm';
import Success from './components/Success';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginFrom />} />
          <Route path='/SignInForm' element={<SignInForm />} />
          <Route path='/Success' element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
