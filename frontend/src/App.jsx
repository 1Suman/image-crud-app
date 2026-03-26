import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ImageList from './pages/ImageList';
import ImageUpload from './pages/ImageUpload';
import ImageEdit from './pages/ImageEdit';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ImageList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={<ImageUpload />} />
                    <Route path="/edit/:id" element={<ImageEdit />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;