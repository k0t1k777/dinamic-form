import { createSlice } from '@reduxjs/toolkit';
import { RootStore } from '../../store';
import { initialStateForm } from '../../../const';

export interface StateType {
  isLoading: boolean;
  error: string | null | unknown;
  localStore: any;
  showForm: boolean;
  showSilects: boolean;
}

const initialState: StateType = {
  isLoading: false,
  error: null,
  localStore: initialStateForm,
  showForm: false,
  showSilects: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setLocalStore(state, action) {
      state.localStore = action.payload;
    },
    setShowForm(state, action) {
      state.showForm = action.payload;
      if (action.payload) {
        state.showSilects = false;
      }
    },
    setShowSilects(state, action) {
      state.showSilects = action.payload;
      if (action.payload) {
        state.showForm = false;
      }
    },
  },
});

export const { setLocalStore, setShowForm, setShowSilects } = formSlice.actions;
export const formReducer = formSlice.reducer;
export const selectForm = (state: RootStore) => state.form;
