import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEntertainers } from '../api/ProjectsAPI';
import { Entertainer } from '../types/EntertainersStats';

const EntertainerList: React.FC = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadEntertainers = async () => {
      try {
        const data = await fetchEntertainers();
        setEntertainers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEntertainers();
  }, []);

  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Entertainers</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate('/entertainer/add')}
        >
          + Add Entertainer
        </button>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Stage Name</th>
            <th>Booking Count</th>
            <th>Last Booking Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map((entertainer) => (
            <tr key={entertainer.entertainerId}>
              <td>{entertainer.stageName}</td>
              <td>{entertainer.bookingCount}</td>
              <td>
                {entertainer.lastBookingDate
                  ? new Date(entertainer.lastBookingDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    navigate(`/entertainer/${entertainer.entertainerId}`)
                  }
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntertainerList;
