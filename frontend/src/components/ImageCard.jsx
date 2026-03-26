import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function ImageCard({ image, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm('Delete this image?')) return;
        try {
            await API.delete(`/images/${image.id}/delete/`);
            onDelete(image.id);
        } catch {
            alert('Failed to delete');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
                src={`http://127.0.0.1:8000${image.image}`}
                alt={image.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {image.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    {image.description || 'No description'}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    By {image.uploaded_by || 'Unknown'}
                </p>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => navigate(`/edit/${image.id}`)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-lg transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}