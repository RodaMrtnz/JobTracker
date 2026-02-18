'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthProvider';

export default function LoginPage() {
	const { login, loading } = useAuth();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');

		const result = await login(formData);

		if (!result.success) {
			setError(result.error || 'Could not sign in');
		}
	};

	return (
		<div className="container" style={{ maxWidth: '480px' }}>
			<div className="card">
				<h1 className="mb-2">Sign in</h1>

				{error ? <div className="error-message">{error}</div> : null}

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label className="form-label" htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label className="form-label" htmlFor="password">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<button type="submit" className="btn btn-primary" disabled={loading}>
						{loading ? 'Signing in...' : 'Sign in'}
					</button>
				</form>

				<p className="mt-2 text-sm text-gray-600">
					Don’t have an account? <Link href="/register">Sign up</Link>
				</p>
			</div>
		</div>
	);
}
