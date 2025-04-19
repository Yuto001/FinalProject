import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/entertainer');
  };

  return (
    <Container className="text-center mt-5">
      <h1>Welcome to the Entertainment Agency</h1>
      <p className="lead">
        Find and manage top entertainment agents with ease.
      </p>
      <Button variant="primary" onClick={handleNavigate}>
        View Entertainers
      </Button>
    </Container>
  );
};

export default LandingPage;
