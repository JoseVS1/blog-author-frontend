import { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router';
import UserContext from '../context/UserContext';
import parse from "html-react-parser"

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
                    <h1>ObsidianPost Admin</h1>
                </div>
                
                {posts.length > 0 ? (
                    <ul className='post-list'>
                        {posts.map(post => (
                            <li key={post.id}>
                                <Link className='post' to={`/posts/${post.id}`}>
                                    <div>
                                        <h2>{post.title}</h2>
                                        {parse(post.content)}
                                    </div>
                                    
                                    <span>{post.published ? "Published" : "Unpublished"}</span>
                                </Link>
                                
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='empty-container'>
                        <h1>There are no posts...</h1>
                        <h2 className='link'><NavLink to="/addPost">Create one</NavLink>.</h2>
                    </div>
                ) }
            </>
        ) : (
            <div className="header-container">
                <h1>You are not an author</h1>
                <h2 className='link'><NavLink to="/becomeAuthor">Become one</NavLink>.</h2>
            </div>
        )}

    </div>
)}
