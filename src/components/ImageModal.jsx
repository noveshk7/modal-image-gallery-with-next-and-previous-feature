import { useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/ImageModal.css';

const ImageModal = ({ image, onClose, onNext, onPrevious }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes className="icon" />
        </button>
        <button className="modal-nav modal-prev" onClick={onPrevious} aria-label="Previous image">
          <FaChevronLeft className="icon" />
        </button>
        <img
          src={image.urls.regular}
          alt={image.alt_description || 'Modal image'}
          className="modal-image"
        />
        <button className="modal-nav modal-next" onClick={onNext} aria-label="Next image">
          <FaChevronRight className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ImageModal