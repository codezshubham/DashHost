import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

const getHeaders = () => {
  const token = localStorage.getItem('jwt');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Delete Client
export const deleteClient = createAsyncThunk(
  'deleteForm/deleteClient',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/clients/delete/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Credential
export const deleteCredential = createAsyncThunk(
  'deleteForm/deleteCredential',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/credentials/delete/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Domain
export const deleteDomain = createAsyncThunk(
  'deleteForm/deleteDomain',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/domains/delete/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Hosting
export const deleteHosting = createAsyncThunk(
  'deleteForm/deleteHosting',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/hostings/delete/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const deleteFormSlice = createSlice({
  name: 'deleteForm',
  initialState: {
    message: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDeleteFormState: (state) => {
      state.message = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Delete Client
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Credential
      .addCase(deleteCredential.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCredential.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteCredential.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Domain
      .addCase(deleteDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Hosting
      .addCase(deleteHosting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHosting.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteHosting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDeleteFormState } = deleteFormSlice.actions;
export default deleteFormSlice.reducer;
