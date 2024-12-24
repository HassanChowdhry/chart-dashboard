/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface ChartState {
  candlestick: any;
  line: any;
  bar: any;
  pie: any;
}

const initialState: ChartState = {
  candlestick: null,
  line: null,
  bar: null,
  pie: null,
};

export const fetchChartData = createAsyncThunk('charts/fetchData', async () => {
  const [candlestick, line, bar, pie] = await Promise.all([
    fetch('http://localhost:8000/api/candlestick-data/').then((res) => res.json()),
    fetch('http://localhost:8000/api/line-chart-data/').then((res) => res.json()),
    fetch('http://localhost:8000/api/bar-chart-data/').then((res) => res.json()),
    fetch('http://localhost:8000/api/pie-chart-data/').then((res) => res.json()),
  ]);
  return { candlestick, line, bar, pie };
});

const chartSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChartData.fulfilled, (state, action: PayloadAction<any>) => {
      state.candlestick = action.payload.candlestick;
      state.line = action.payload.line;
      state.bar = action.payload.bar;
      state.pie = action.payload.pie;
    });
  },
});

export default chartSlice.reducer;
