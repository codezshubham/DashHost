import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Update Client
export const updateClient = createAsyncThunk(
  'updateForm/updateClient',
  async ({ id, clientData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/clients/update/${id}`, clientData, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Credential
export const updateCredential = createAsyncThunk(
  'updateForm/updateCredential',
  async ({ id, credentialData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/credentials/update/${id}`, credentialData, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Domain
export const updateDomain = createAsyncThunk(
  'updateForm/updateDomain',
  async ({ id, domainData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/domains/update/${id}`, domainData, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Hosting
export const updateHosting = createAsyncThunk(
  'updateForm/updateHosting',
  async ({ id, hostingData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/hostings/update/${id}`, hostingData, { headers: getHeaders() });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const updateFormSlice = createSlice({
  name: 'updateForm',
  initialState: {
    client: null,
    credential: null,
    domain: null,
    hosting: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUpdateFormState: (state) => {
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
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Credential
      .addCase(updateCredential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCredential.fulfilled, (state, action) => {
        state.loading = false;
        state.credential = action.payload;
      })
      .addCase(updateCredential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Domain
      .addCase(updateDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.domain = action.payload;
      })
      .addCase(updateDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Hosting
      .addCase(updateHosting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHosting.fulfilled, (state, action) => {
        state.loading = false;
        state.hosting = action.payload;
      })
      .addCase(updateHosting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUpdateFormState } = updateFormSlice.actions;
export default updateFormSlice.reducer;
