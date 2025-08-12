import NavbarComp from './components/NavbarComp';
import CreateForm from './components/CreateForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPosts from './components/AllPosts';
import EditUser from './components/EditUser';

function App() {
  return (
    <BrowserRouter> 
      <div className='container'>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/edit-user/:userId" element={<EditUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;