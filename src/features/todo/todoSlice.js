import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
  },
  reducers: {
    createData: (state, action) => {
      state.data.push(action.payload);
    },
    updateData: {
      reducer: (state, action) => {
        state.data[action.payload.index] = action.payload.name;
      },
      prepare: (name, index) => {
        return {
          payload: {
            name: name,
            index: index,
          },
        };
      },
    },
    deleteData: (state, action) => {
      state.data.splice(action.payload, 1);
    },
  },
});

const { createData, updateData, deleteData } = todoSlice.actions;

const selectTodo = (state) => state.todo.data;

export { todoSlice, createData, updateData, deleteData, selectTodo };
export default todoSlice.reducer;
