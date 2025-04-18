import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext";
import { parseISO, format } from "date-fns"

export const Comment = ({ comment, setComments }) => {
    const [commentUser, setCommentUser] = useState({});
    const [text, setText] = useState(comment.text);
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useContext(UserContext);
    const [formattedUpdatedAt, setFormattedUpdatedAt] = useState(format(parseISO(comment.updatedAt), "MMMM do, yyyy"));

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${comment.userId}`);
                const data = await response.json();

                setCommentUser(data.user);
            } catch (err) {
                console.error(err);
            }
        };

        getUser();
    }, [comment.userId]);

    const handleUpdateComment = async () => {
        setIsEditing(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/comments/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    text,
                    isAuthor: user.isAuthor
                })
            });

            const data = await response.json();

            if (response.ok) {
                const updatedComment = data.comment;

                setComments(prevComments => prevComments.map(c => c.id === comment.id ? {...c, text: updatedComment.text, updatedAt: updatedComment.updatedAt} : c));
                setIsEditing(false);
                setFormattedUpdatedAt(format(parseISO(data.comment.updatedAt), "MMMM do, yyyy"));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteComment = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/comments/${comment.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.ok) {
                setComments(prevComments => prevComments.filter(c => c.id !== comment.id));
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }
  return (
    <div className="comment">
        <h2>By: {commentUser.username}</h2>
        {comment.createdAt !== comment.updatedAt && <h3>Updated at: {formattedUpdatedAt}</h3>}

        {isEditing ? (
            <form className="update-comment-form" onSubmit={handleSubmit}>
                <textarea name="text" id="text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                
                <div className="update-comment-actions">
                    <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                    <button className="edit-comment-button" type="submit">Edit</button>
                </div>
            </form>
        ) : (
            <>
                <p>{comment.text}</p>

                <div className="comment-actions">
                    <button className="update-button" onClick={handleUpdateComment}>Edit</button>
                    <button className="delete-button" onClick={handleDeleteComment}>Delete</button>
                </div>
            </>
        )}
    </div>
  )
}
