import EntertainerList from '../components/EntertainerList';
import GoBackHomeButton from '../components/GoBackHome';

const EntertainerPage: React.FC = () => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Manage Entertainers</h1>
      <EntertainerList />
      <GoBackHomeButton />
    </div>
  );
};

export default EntertainerPage;
