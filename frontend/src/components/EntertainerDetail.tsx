import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getEntertainerById,
  deleteEntertainer,
  updateEntertainer,
} from '../api/ProjectsAPI';
import { FullEntertainer } from '../types/Entertainer';

const EntertainerDetail: React.FC = () => {
  const { entertainerId } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<FullEntertainer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<FullEntertainer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntertainer = async () => {
      try {
        if (entertainerId) {
          const data = await getEntertainerById(Number(entertainerId));
          setEntertainer(data);
          setFormData(data);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadEntertainer();
  }, [entertainerId]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this entertainer?'
    );
    if (!confirmed || !entertainerId) return;

    await deleteEntertainer(Number(entertainerId));
    navigate('/entertainer');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await updateEntertainer(formData.entertainerId, formData);
      setEntertainer(formData);
      setEditMode(false);
    } catch (err) {
      alert('Failed to update entertainer');
    }
  };

  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!entertainer || !formData) return <p>Loading entertainer...</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">
        {editMode ? 'Edit Entertainer' : entertainer.entStageName}
      </h2>

      {editMode ? (
        <form onSubmit={handleUpdate}>
          <div className="row">
            {Object.entries(formData).map(([key, value]) =>
              key === 'entertainerId' ? null : (
                <div className="mb-3 col-md-6" key={key}>
                  <label className="form-label text-capitalize">
                    {key.replace('ent', '').replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={key === 'dateEntered' ? 'date' : 'text'}
                    name={key}
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                  />
                </div>
              )
            )}
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <ul className="list-unstyled">
            <li>
              <strong>SSN:</strong> {entertainer.entSsn}
            </li>
            <li>
              <strong>Address:</strong> {entertainer.entStreetAddress},{' '}
              {entertainer.entCity}, {entertainer.entState}{' '}
              {entertainer.entZipCode}
            </li>
            <li>
              <strong>Phone:</strong> {entertainer.entPhoneNumber}
            </li>
            <li>
              <strong>Website:</strong> {entertainer.entWebPage}
            </li>
            <li>
              <strong>Email:</strong> {entertainer.entEmailAddress}
            </li>
            <li>
              <strong>Date Entered:</strong>{' '}
              {new Date(entertainer.dateEntered).toLocaleDateString()}
            </li>
          </ul>

          <button
            className="btn btn-warning me-2"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default EntertainerDetail;
