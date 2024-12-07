import PropTypes from 'prop-types'; 
const ErrorPopup = ({ message, onClose }) => {
    return (
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center "
        style={{ zIndex: 9999 }}
        onClick={onClose}
      >
        <div
          className="bg-neutral p-6 rounded-lg shadow-lg max-w-sm w-full"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
        >
          <h2 className="text-red-600 font-bold text-lg">Error</h2>
          <p className="bg-white mt-2">{message}</p>
          <button
            className="mt-4 text-white bg-red-500 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  ErrorPopup.propTypes = {
    message: PropTypes.string.isRequired,  
    onClose: PropTypes.func.isRequired     
  };
  
  export default ErrorPopup;
  