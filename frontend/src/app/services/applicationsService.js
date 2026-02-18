const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const parseJsonSafe = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const ensureAuth = () => {
  if (!getAuthToken()) {
    throw new Error('You must be logged in');
  }
};

const applicationsService = {
  async getAll() {
    ensureAuth();

    const res = await fetch(`${API_BASE_URL}/api/applications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include',
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) throw new Error(data?.error || 'Error fetching applications');
    return Array.isArray(data) ? data : [];
  },

  async getById(id) {
    ensureAuth();

    const res = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include',
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) throw new Error(data?.error || 'Application not found');
    return data;
  },

  async create(applicationData) {
    ensureAuth();

    const payload = {
      ...applicationData,
      companyId: Number(applicationData.companyId),
    };

    const res = await fetch(`${API_BASE_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) throw new Error(data?.error || 'Error creating application');
    return data;
  },

  async updateById(id, updateData) {
    ensureAuth();

    const payload = {
      ...updateData,
      ...(updateData.companyId !== '' && updateData.companyId !== undefined
        ? { companyId: Number(updateData.companyId) }
        : {}),
    };

    const res = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) throw new Error(data?.error || 'Error updating application');
    return data;
  },
};

export default applicationsService;
