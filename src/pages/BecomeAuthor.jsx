import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useNavigate } from "react-router"
import { Errors } from "../components/Errors"

export const BecomeAuthor = () => {
    const { user, setUser } = useContext(UserContext);
    const [code, setCode] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (user.isAuthor) {
            navigate("/");
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/users/${user.id}/author`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    code
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors([data.message]);
            } else {
                setErrors([]);
                setUser(data.user);
                navigate("/");
            }

            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className="become-author-page">
        <h1>Become an author</h1>

        <form className="become-author-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="code">Enter the secret code: </label>
                <input type="text" name="code" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
                
                {errors.length > 0 && <Errors errors={errors} />}
            </div>
            
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
