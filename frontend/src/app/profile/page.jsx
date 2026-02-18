'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthProvider';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile, loading } = useAuth();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setName(user?.name || '');
  }, [isAuthenticated, router, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const result = await updateProfile({ name });

    if (!result.success) {
      setError(result.error || 'Could not update profile');
      return;
    }

    setSuccess('Profile updated successfully');
  };

  if (!isAuthenticated) {
    return <div className="loading">Redirecting...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: '520px' }}>
      <div className="card">
        <h1 className="mb-2">My profile</h1>

        {error ? <div className="error-message">{error}</div> : null}
        {success ? <div className="success-message">{success}</div> : null}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={user?.email || ''}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Update profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
