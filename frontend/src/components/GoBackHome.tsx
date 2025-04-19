import { useNavigate } from 'react-router-dom';

const GoBackHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="my-3">
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default GoBackHomeButton;
