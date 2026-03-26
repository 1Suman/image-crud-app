import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function ImageUpload() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        await API.post('/images/create/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        navigate('/');
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <input placeholder="Title" value={title}
                onChange={e => setTitle(e.target.value)} />
            <input placeholder="Description" value={description}
                onChange={e => setDescription(e.target.value)} />
            <input type="file" onChange={e => setImage(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
}