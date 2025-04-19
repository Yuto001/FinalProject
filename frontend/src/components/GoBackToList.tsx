import { useNavigate } from 'react-router-dom';

const GoBackToListButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="my-3">
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate('/entertainer')}
      >
        ← Back to Entertainer List
      </button>
    </div>
  );
};

export default GoBackToListButton;
