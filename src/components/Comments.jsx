import { Comment } from "./Comment"

export const Comments = ({comments, setComments}) => {
  return (
    <div>
        <ul>
            {comments.map(comment => (
                <Comment  key={comment.id} comment={comment} setComments={setComments} />
            ))}
        </ul>
    </div>
  )
}
