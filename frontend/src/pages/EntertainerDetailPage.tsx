import EntertainerDetail from '../components/EntertainerDetail';
import GoBackToListButton from '../components/GoBackToList';

const EntertainerDetailPage: React.FC = () => {
  return (
    <div className="container my-4">
      <EntertainerDetail />
      <GoBackToListButton />
    </div>
  );
};

export default EntertainerDetailPage;
