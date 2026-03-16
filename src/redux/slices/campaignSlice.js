import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { ENDPOINTS } from '../../services/endpoints';

export const fetchCampaigns = createAsyncThunk('campaign/fetchCampaigns', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(ENDPOINTS.GET_CAMPAIGNS);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createCampaign = createAsyncThunk('campaign/createCampaign', async (campaignData, { rejectWithValue }) => {
  try {
    const response = await api.post(ENDPOINTS.CREATE_CAMPAIGN, campaignData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    campaigns: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch campaigns';
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.campaigns.push(action.payload);
      });
  },
});

export default campaignSlice.reducer;
