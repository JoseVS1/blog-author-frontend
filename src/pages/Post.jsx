import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { Comments } from "../components/Comments";
import UserContext from "../context/UserContext";
import { Link } from "react-router";
import { Errors } from "../components/Errors";
import parse from "html-react-parser"

export const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [postUser, setPostUser] = useState("");
    const [comments, setComments] = useState(null);
    const { user } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${id}`);
                const data = await response.json();

                setPost(data.post);
            } catch (err) {
                console.error(err);
            }
        }

        getPost();
    }, [id]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${post.userId}`);
                const data = await response.json();

                setPostUser(data.user);
            } catch (err) {
                console.error(err);
            }
        }

        if (post) {
            getUser();
        }
    }, [post]);

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${id}/comments`);
                const data = await response.json();

                setComments(data.comments);
            } catch (err) {
                console.error(err);
            }
        }

        getComments();
    }, [id]);

    const handleDeletePost = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await response.json();

            if (!response.ok) {
                setErrors([data.message]);
            } else {
                setErrors([]);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleTogglePublish = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: post.title,
                    content: post.content,
                    published: !post.published
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors([data.message]);
            } else {
                setErrors([]);
                setPost(data.updatedPost);
            }
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className="post-page">
        {post ? (
            <>
                {errors.length > 0 && <Errors errors={errors} />}

                <h1>{post.title}</h1>
                <h2>By: {postUser.username}</h2>
                <h3>Created at: {post.createdAt}</h3>

                <p className="post-content">
                    {parse(post.content)}
                </p>
                
                <div className="post-actions">
                    <button className="publish-button" onClick={handleTogglePublish}>{post.published ? "Unpublish" : "Publish"}</button>
                    <Link className="update-button" to={`/posts/${id}/update`}>Update</Link>
                    <button className="delete-button" onClick={handleDeletePost}>Delete</button>
                </div>
                
                {comments && comments.length > 0 ? <Comments comments={comments} setComments={setComments} /> : <h1>There are no comments</h1> }
            </>
        ) : (
            <p>Loading post...</p>
        )}
    </div>
  )
}
