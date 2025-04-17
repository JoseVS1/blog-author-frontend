import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { Errors } from "../components/Errors";

export const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [editorInitialized, setEditorInitialized] = useState(false);

    useEffect(() => {
        tinymce.remove('#post-form-content');
        
        const initEditor = () => {
            tinymce.init({
                content_css: "/src/editor-content.css",
                selector: '#post-form-content',
                skin: 'oxide-dark',
                height: 500,
                setup: function(editor) {
                    editor.on('init', function() {
                        setEditorInitialized(true);
                        if (formData.content) {
                            editor.setContent(formData.content);
                        }
                    });
                    
                    editor.on('change keyup', function() {
                        const content = editor.getContent();
                        setFormData(prev => ({
                            ...prev,
                            content: content
                        }));
                    });
                }
            });
        };

        const timer = setTimeout(initEditor, 100);

        return () => {
            clearTimeout(timer);
            tinymce.remove('#post-form-content');
            setEditorInitialized(false);
        };
    }, []);

    const handleInputChange = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const editor = tinymce.get("post-form-content");
        const content = editor ? editor.getContent() : "";

        if (!content) {
            setErrors(["Post body is required"]);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: content
                })
            });
            
            const data = await response.json();
            console.log(data)
            
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

    return (
        <div className="create-post-page">
            <div className="header-container">
                <h1>Create a new post</h1>
            </div>
            
            <form className="create-post-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                
                <textarea 
                    id="post-form-content"
                    name="content"
                />

                {errors.length > 0 && <Errors errors={errors} />}
                
                <button type="submit">Post</button>
            </form>
            
        </div>
    )
}