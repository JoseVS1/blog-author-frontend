import { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router';
import UserContext from '../context/UserContext';

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/posts");
                const data = await response.json();

                setPosts(data.posts);
            } catch (err) {
            console.error(err);
            }
        }

        getPosts();
    }, []);
  return (
    <div className='home-page'>
        {user && user.isAuthor ? (
            <>
                <div className="header-container">
                    <h1>Blog Admin</h1>
                </div>
                
                {posts.length > 0 ? (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                                <span>{post.published ? "Published" : "Unpublished"}</span>
                            </li>
                        ))}
                    </ul>
                ) : <h1>Hola</h1> }
            </>
        ) : (
            <div className="header-container">
                <h1>You are not an author</h1>
                <h2 className='link'><NavLink to="/becomeAuthor">Become one</NavLink>.</h2>
            </div>
        )}

    </div>
)}
