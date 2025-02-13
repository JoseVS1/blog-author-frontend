import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router';
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
    <>
        {user && user.isAuthor ? (
            <>
                <div>Blog Admin</div>

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
            <h1>You are not an author</h1>
        )}

    </>
)}
