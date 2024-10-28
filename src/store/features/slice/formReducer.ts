import { createSlice } from '@reduxjs/toolkit';
import { RootStore } from '../../store';
import { initialStateForm } from '../../../const';

export interface StateType {
  isLoading: boolean;
  error: string | null | unknown;
  localStore: any;
}

const initialState: StateType = {
  isLoading: false,
  error: null,
  localStore: initialStateForm,
};


const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setLocalStore(state, action) {
      state.localStore = action.payload;
    },
  },
});

export const { setLocalStore } = formSlice.actions;
export const formReducer = formSlice.reducer;
export const selectForm = (state: RootStore) => state.form;
