import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api'; // Axios instance with baseURL

// ------------------ Async Thunks ------------------

export const getHeaders = () => {
  const token = localStorage.getItem('jwt');

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Create User
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/users/create', userData, { headers: getHeaders() });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

// Get User by ID
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/users/${id}`, { headers: getHeaders() });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/users/profile', { headers: getHeaders() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error fetching user profile');
  }
});

// Get User by Email
export const getUserByEmail = createAsyncThunk(
  'user/getUserByEmail',
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/users/email/${email}`, { headers: getHeaders() });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user by email');
    }
  }
);

// Get All Users
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/users/all', { headers: getHeaders() });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/users/delete/${id}`, { headers: getHeaders() });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

export const getMyClients = createAsyncThunk(
  'user/getMyClients',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/users/my-clients', { headers: getHeaders() });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch clients');
    }
  }
);

// Fetch All Logs
export const fetchAllLogs = createAsyncThunk(
  'user/fetchAllLogs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/logs/all', { headers: getHeaders() });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch logs');
    }
  }
);

// ------------------ Initial State ------------------

const initialState = {
  users: [],
  selectedUser: null,
  clients: [],
  logs: [],
  loading: false,
  error: null,
};

// ------------------ Slice ------------------

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })

      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get by Email
      .addCase(getUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getMyClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Logs
      .addCase(fetchAllLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchAllLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

// ------------------ Exports ------------------

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
