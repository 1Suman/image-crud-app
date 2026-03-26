import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function ImageEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        API.get(`/images/${id}/`).then(res => {
            setTitle(res.data.title);
            setDescription(res.data.description);
        });
    }, [id]);

    const handleUpdate = async () => {
        await API.patch(`/images/${id}/update/`, { title, description });
        navigate('/');
    };

    return (
        <div>
            <h2>Edit Image</h2>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <input value={description} onChange={e => setDescription(e.target.value)} />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
}