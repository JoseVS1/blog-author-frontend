import { Comment } from "./Comment"

export const Comments = ({comments, setComments}) => {
  return (
    <div>
        <h2 className="comment-heading">Comments</h2>
        <ul className="comment-list">
            {comments.map(comment => (
                <Comment  key={comment.id} comment={comment} setComments={setComments} />
            ))}
        </ul>
    </div>
  )
}
