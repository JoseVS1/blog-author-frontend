import { useContext } from "react";
import { NavLink, useNavigate } from "react-router"
import UserContext from "../context/UserContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }

  return (
    <nav>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>

            <div>
              {user ? (
                <>
                  {!user.isAuthor ? <li><NavLink to="/becomeAuthor">Become an author</NavLink></li> : (
                    <li>
                      <NavLink to="/addPost">Create post</NavLink>
                    </li>
                  ) }

                  <li>
                    <span onClick={handleLogout}>Log out</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login">Log in</NavLink>
                  </li>
                </>
              )}
            </div>
            
        </ul>
    </nav>
  )
}
