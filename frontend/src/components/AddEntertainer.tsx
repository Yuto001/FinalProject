import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEntertainer } from '../api/ProjectsAPI';
import { FullEntertainer } from '../types/Entertainer';

const AddEntertainer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FullEntertainer>({
    entertainerId: 0,
    entStageName: '',
    entSsn: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    dateEntered: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEntertainer(formData);
      navigate('/entertainer'); // back to list
    } catch (err) {
      alert('Failed to add entertainer');
    }
  };

  return (
    <div className="container my-4">
      <h2>Add New Entertainer</h2>
      <form onSubmit={handleSubmit}>
        {[
          ['entStageName', 'Stage Name'],
          ['entSsn', 'SSN'],
          ['entStreetAddress', 'Street Address'],
          ['entCity', 'City'],
          ['entState', 'State'],
          ['entZipCode', 'Zip Code'],
          ['entPhoneNumber', 'Phone Number'],
          ['entWebPage', 'Web Page'],
          ['entEmailAddress', 'Email Address'],
          ['dateEntered', 'Date Entered'],
        ].map(([name, label]) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={name === 'dateEntered' ? 'date' : 'text'}
              name={name}
              className="form-control"
              value={formData[name as keyof FullEntertainer]}
              onChange={handleChange}
              required={name === 'entStageName'}
            />
          </div>
        ))}
        <button className="btn btn-success" type="submit">
          Submit
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/entertainer')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEntertainer;
