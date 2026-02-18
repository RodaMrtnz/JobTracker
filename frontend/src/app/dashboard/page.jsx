'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import applicationsService from '@/app/services/applicationsService';
import companiesService from '@/app/services/companiesService';

export default function DashboardPage() {
	const [applications, setApplications] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);

				const [appsData, companiesData] = await Promise.all([
					applicationsService.getAll(),
					companiesService.getAll(),
				]);

				setApplications(Array.isArray(appsData) ? appsData : []);
				setCompanies(Array.isArray(companiesData) ? companiesData : []);
				setError(null);
			} catch (err) {
				setError(err?.message || 'Error loading dashboard');
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	const stats = useMemo(() => {
		const statusCount = {
			applied: 0,
			interviewing: 0,
			offer: 0,
			accepted: 0,
			rejected: 0,
		};

		applications.forEach((app) => {
			if (statusCount[app.statusName] !== undefined) {
				statusCount[app.statusName] += 1;
			}
		});

		return {
			applications: applications.length,
			companies: companies.length,
			...statusCount,
		};
	}, [applications, companies]);

	if (loading) {
		return <div className="loading">Loading dashboard...</div>;
	}

	if (error) {
		return (
			<div>
				<h1 className="mb-2">Dashboard</h1>
				<div className="error-message">{error}</div>
			</div>
		);
	}

	return (
		<div>
			<h1 className="mb-2">Dashboard</h1>

			<div className="grid grid-cols-3 mb-2">
				<div className="card">
					<p className="text-sm text-gray-600">Total Applications</p>
					<p className="text-lg font-bold">{stats.applications}</p>
				</div>
				<div className="card">
					<p className="text-sm text-gray-600">Total Companies</p>
					<p className="text-lg font-bold">{stats.companies}</p>
				</div>
				<div className="card">
					<p className="text-sm text-gray-600">Offers + Accepted</p>
					<p className="text-lg font-bold">{stats.offer + stats.accepted}</p>
				</div>
			</div>

			<div className="grid grid-cols-3 mb-2">
				<div className="card">
					<p className="text-sm text-gray-600">Applied</p>
					<p className="text-lg font-bold">{stats.applied}</p>
				</div>
				<div className="card">
					<p className="text-sm text-gray-600">Interviewing</p>
					<p className="text-lg font-bold">{stats.interviewing}</p>
				</div>
				<div className="card">
					<p className="text-sm text-gray-600">Rejected</p>
					<p className="text-lg font-bold">{stats.rejected}</p>
				</div>
			</div>

			<div className="flex gap-2">
				<Link href="/applications" className="btn btn-primary">Go to Applications</Link>
				<Link href="/applications/new" className="btn btn-secondary">Create Application</Link>
			</div>
		</div>
	);
}
