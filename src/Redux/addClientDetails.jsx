import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api'; // Custom axios instance with base URL

const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Create Hosting
export const createHosting = createAsyncThunk(
  'clientEntities/createHosting',
  async ({ clientId, hostingData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/hostings/add/${clientId}`, hostingData, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create Domain
export const createDomain = createAsyncThunk(
  'clientEntities/createDomain',
  async ({ clientId, domainData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/domains/add/${clientId}`, domainData, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create Credential
export const createCredential = createAsyncThunk(
  'clientEntities/createCredential',
  async ({ clientId, credentialData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/credentials/add/${clientId}`, credentialData, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getClientById = createAsyncThunk(
  'clientEntities/getById',
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/clients/${clientId}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const clientEntitySlice = createSlice({
  name: 'clientEntities',
  initialState: {
    hosting: null,
    domain: null,
    credential: null,
    client: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearEntityState: (state) => {
      state.hosting = null;
      state.domain = null;
      state.credential = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Hosting
    builder
      .addCase(createHosting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHosting.fulfilled, (state, action) => {
        state.loading = false;
        state.hosting = action.payload;
      })
      .addCase(createHosting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Domain
    builder
      .addCase(createDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.domain = action.payload;
      })
      .addCase(createDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Credential
    builder
      .addCase(createCredential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCredential.fulfilled, (state, action) => {
        state.loading = false;
        state.credential = action.payload;
      })
      .addCase(createCredential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    builder
      .addCase(getClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearEntityState } = clientEntitySlice.actions;
export default clientEntitySlice.reducer;
