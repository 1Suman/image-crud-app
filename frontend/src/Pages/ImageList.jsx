import ImageCard from '../components/ImageCard';

// inside your return, replace the map with:
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {images.map(img => (
        <ImageCard
            key={img.id}
            image={img}
            onDelete={(id) => setImages(images.filter(i => i.id !== id))}
        />
    ))}
</div>