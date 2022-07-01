import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ContextProvider from './context/ContextProvider';
import PrivateRoute from './context/PrivateRoute';

function App() {
    return (
        <div className='App'>
            <ContextProvider>
                <BrowserRouter>
                    <Routes>
                        {/* <Route path='/home' element={<Home />} /> */}
                        <Route
                            path='/home'
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route
                            path='/registration'
                            element={<Registration />}
                        />
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </div>
    );
}

export default App;
