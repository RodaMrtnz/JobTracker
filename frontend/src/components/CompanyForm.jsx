'use client';

import { useEffect, useState } from 'react';

export default function CompanyForm({
  onSubmit,
  initialData = null,
  loading = false,
  error = null,
}) {
  const [formData, setFormData] = useState({ name: '', industry: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData?.name || '',
        industry: initialData?.industry || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name" className="form-label">Company Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="industry" className="form-label">Company Industry</label>
        <input
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
          className="form-control"
          disabled={loading}
        />
      </div>

      <button type="submit" className="app-detail-save-button" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
