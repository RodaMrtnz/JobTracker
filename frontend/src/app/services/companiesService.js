const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

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

const companiesService = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/api/companies`, {
      credentials: 'include',
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) throw new Error(data?.error || 'Error fetching companies');

    if (Array.isArray(data)) return data;
    return data?.companies || [];
  },

  async create(companyData) {
    if (!getAuthToken()) {
      throw new Error('You must be logged in to create a company');
    }

    const res = await fetch(`${API_BASE_URL}/api/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include',
      body: JSON.stringify(companyData),
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) throw new Error(data?.error || 'Error creating company');
    return data;
  },

  async getById(id) {
    const res = await fetch(`${API_BASE_URL}/api/companies/${id}`, {
      credentials: 'include',
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) throw new Error(data?.error || 'Company not found');
    return data;
  },

  async updateById(id, updateData) {
    if (!getAuthToken()) {
      throw new Error('You must be logged in to edit a company');
    }

    const res = await fetch(`${API_BASE_URL}/api/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      credentials: 'include',
      body: JSON.stringify(updateData),
    });

    const data = await parseJsonSafe(res);
    if (!res.ok) throw new Error(data?.error || 'Error updating company');
    return data;
  },
};

export default companiesService;
