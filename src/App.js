import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Navbar from './component/Layout/Navbar';
import Footer from './component/Layout/Footer';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import User from './Pages/User';
import UserResults from './component/Users/UserResults';
import { GithubProvider } from './component/context/github/GithubContext';
import {AlertProvider} from './component/context/alert/AlertContext'
import Alert from './component/Layout/Alert';

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />

            <main className='container mx-auto px-3 pb-12'>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/About' element={<About />} />
                <Route path='/user/:login' element={<User />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
                <Footer/>
          </div>
        </Router>
      </AlertProvider>
    
    </GithubProvider> 
  );
}

export default App;
