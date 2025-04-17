import { Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { Post } from './pages/Post'
import UserContext from "./context/UserContext"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Login } from "./pages/Login"
import { Navbar } from './components/Navbar'
import { NoMatch } from './pages/NoMatch'
import { BecomeAuthor } from './pages/BecomeAuthor'
import { CreatePost } from './pages/CreatePost'
import { UpdatePost } from "./pages/UpdatePost"
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const loggedUserId = jwtDecode(localStorage.getItem("token")).sub;

      const getLoggedUser = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/users/${loggedUserId}`);
          const data = await response.json();

          setUser(data.user);
        } catch (err) {
          console.error(err);
        }
      }

      getLoggedUser();
    }
  }, [])

  return (
    <>
      <UserContext.Provider value={{ user, setUser, errors, setErrors}}>
        <Navbar />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={
            <ProtectedRoute user={user}>
              <Post />
            </ProtectedRoute>
          } />
          <Route path="/posts/:id/update" element={
            <ProtectedRoute user={user}>
              <UpdatePost />
            </ProtectedRoute>
          } />
          <Route path='/becomeAuthor' element={
            <ProtectedRoute user={user}>
              <BecomeAuthor />
            </ProtectedRoute>
          } />
          <Route path="/addPost" element={
            <ProtectedRoute user={user}>
              <CreatePost />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
