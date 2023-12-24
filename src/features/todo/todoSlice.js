import { createSlice } from "@reduxjs/toolkit";
const { v4: uuidv4 } = require("uuid");

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: {},
  },
  reducers: {
    createData: {
      reducer: (state, action) => {
        state.data[uuidv4()] = action.payload;
      },
      prepare: (name, description, deadline) => {
        return {
          payload: {
            name: name,
            description: description,
            deadline: deadline,
            is_done: false,
          },
        };
      },
    },
    updateData: {
      reducer: (state, action) => {
        state.data[action.payload.id] = action.payload.data;
      },
      prepare: (id, name, description, deadline, isDone) => {
        return {
          payload: {
            data: {
              name: name,
              description: description,
              deadline: deadline,
              is_done: isDone,
            },
            id: id,
          },
        };
      },
    },
    deleteData: (state, action) => {
      delete state.data[action.payload];
    },
  },
});

const { createData, updateData, deleteData } = todoSlice.actions;

const selectTodo = (state) => state.todo.data;

export { todoSlice, createData, updateData, deleteData, selectTodo };
export default todoSlice.reducer;
