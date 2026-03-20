'use client';

import { useState } from 'react';

const statusOptions = [
  { value: 'applied', label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offer', label: 'Offer' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
];

export default function ApplicationForm({ 
  onSubmit, 
  initialData = null, 
  companies = [],
  loading = false,
  error = null 
}) {
  const [formData, setFormData] = useState({
    companyId: initialData?.companyId || '',
    position: initialData?.position || '',
    technology: initialData?.technology || '',
    description: initialData?.description || '',
    jobLink: initialData?.jobLink || '',
    statusName: initialData?.statusName || 'applied',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="companyId" className="form-label">
          Company
        </label>
        <select
          id="companyId"
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          required
          className="form-control"
          disabled={loading}
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="position" className="form-label">
          Position
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="e.g: Senior Developer"
          required
          className="form-control"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="technology" className="form-label">
          Technology
        </label>
        <input
          type="text"
          id="technology"
          name="technology"
          value={formData.technology}
          onChange={handleChange}
          placeholder="e.g: React, Node.js"
          required
          className="form-control"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the offer, requirements, etc."
          required
          className="form-control form-textarea"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobLink" className="form-label">
          Job Link
        </label>
        <input
          type="url"
          id="jobLink"
          name="jobLink"
          value={formData.jobLink}
          onChange={handleChange}
          placeholder="https://..."
          required
          className="form-control"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="statusName" className="form-label">
          Status
        </label>
        <select
          id="statusName"
          name="statusName"
          value={formData.statusName}
          onChange={handleChange}
          required
          className="form-control"
          disabled={loading}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button 
        type="submit" 
        className="form-submit-button"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Application'}
      </button>
    </form>
  );
}
