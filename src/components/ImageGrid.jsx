import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ImageModal from './ImageModal';
import '../styles/ImageGrid.css';

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const fetchImages = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=20&client_id=cqoIWu3kfDYNolpFznPNcyXrq0omlUyZEJU20ZPtr6U`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newImages = await response.json();
      
      if (!Array.isArray(newImages)) {
        throw new Error('Invalid response format');
      }

      setImages(prev => [...prev, ...newImages]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchImages();
    }
  }, [inView]);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedImage(images[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedImage(images[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    }
  };

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchImages} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="image-grid">
        {images.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="image-item"
            style={{
              gridRowEnd: `span ${Math.ceil(image.height / image.width * 10)}`
            }}
          >
            <div className="image-wrapper">
              <img
                src={image.urls.small}
                alt={image.alt_description || 'Gallery image'}
                loading="lazy"
                onClick={() => handleImageClick(image, index)}
              />
            </div>
          </div>
        ))}
        {loading && (
          <div className="loading-skeleton">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton-item" />
            ))}
          </div>
        )}
        <div ref={ref} className="intersection-observer" />
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => {
            setSelectedImage(null);
            setSelectedIndex(null);
          }}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default ImageGrid;