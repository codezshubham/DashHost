import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api'; 

const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Thunks for creating each entity
export const createClient = createAsyncThunk(
  'clientForm/createClient',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/clients/create`, clientData, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const createCredential = createAsyncThunk(
  'clientForm/createCredential',
  async (credentialData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/credentials/create`, credentialData, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const createDomain = createAsyncThunk(
  'clientForm/createDomain',
  async (domainData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/domains/create`, domainData, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const createHosting = createAsyncThunk(
  'clientForm/createHosting',
  async (hostingData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/hostings/create`, hostingData, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

// Slice
const clientFormSlice = createSlice({
  name: 'clientForm',
  initialState: {
    client: null,
    credential: null,
    domain: null,
    hosting: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearClientFormState: (state) => {
      state.client = null;
      state.credential = null;
      state.domain = null;
      state.hosting = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Client
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Credential
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

      // Domain
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
      })

      // Hosting
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
  },
});

export const { clearClientFormState } = clientFormSlice.actions;
export default clientFormSlice.reducer;
