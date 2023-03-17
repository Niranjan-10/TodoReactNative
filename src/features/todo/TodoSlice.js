import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/getTodos', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos',
  );
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodos', async data => {
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/todos',
    data,
  );
  return response.data;
});

export const getTodo = createAsyncThunk('todo/getTodo', async id => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
  );

  return response.data;
});

export const updateTodo = createAsyncThunk('todo/updateTodo', async data => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${data.id}`,
    data,
  );
  return response.data;
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async data => {
  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/todos/${data.id}`,
  );

  return response.data;
});

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    todo: null,
    isLoading: false,
    success: false,
    failed: false,
    error: null,
    addTodoSuccess: false,
    deleteSuccess: false,
    updateSucess: false,
    deleteId: null,
  },
  reducers: {
    resetState: (state, action) => {
      state.addTodoSuccess = false;
      state.todo = null;
      state.error = null;
      state.failed = false;
      state.deleteId = null;
      state.deleteSuccess = false;
      state.updateSucess = false;
    },
    deleteInLocalTodo: (state, action) => {
      const todoList = state.todos;
      if (state.deleteId !== null)
        state.todos = todoList.filter(item => item.id !== state.deleteId);
    },
    addInLocalTodo: (state, action) => {
      const todoList = state.todos;
      if (state.todo) {
        todoList.unshift(state.todo);
        state.todos = todoList;
      }
    },
    updateInLocalTodo: (state, action) => {
      const todoList = state.todos;
      if (state.todo !== null) {
        const index = todoList.findIndex(item => item.id === state.todo.id);
        todoList[index] = state.todo;

        state.todos = todoList;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload.splice(0, 7);
      state.success = true;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.failed = true;
      state.error = 'Something went wrong!!';
    });

    builder.addCase(addTodo.pending, (state, action) => {
      state.isLoading = true;
      state.todo = action.meta.arg;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addTodoSuccess = true;
    });

    builder.addCase(addTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.failed = true;
      state.error = 'Something went wrong';
    });
    builder.addCase(getTodo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.todo = action.payload;
    });

    builder.addCase(getTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.failed = true;
      state.error = 'Something went wrong';
    });

    builder.addCase(updateTodo.pending, (state, action) => {
      state.isLoading = true;
      state.todo = action.meta.arg;
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateSucess = true;
    });

    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Something went wrong';
      state.failed = true;
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      state.deleteId = action.meta.arg.id;
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteSuccess = true;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.failed = true;
      state.error = 'Something went wrong';
    });
  },
});

export default todoSlice.reducer;

export const {
  resetState,
  deleteInLocalTodo,
  addInLocalTodo,
  updateInLocalTodo,
} = todoSlice.actions;
