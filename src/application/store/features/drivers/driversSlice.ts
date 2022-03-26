import { Driver } from '../../../../domain/entities/Driver';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DriversState {
  drivers: Driver[];
}

const initialState: DriversState = {
  drivers: [],
};

export const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDrivers: (state, action: PayloadAction<Driver[]>) => {
      const drivers = action.payload;
      state.drivers = drivers;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const driversActions = driversSlice.actions;
export const { setDrivers } = driversActions;
export default driversSlice.reducer;
