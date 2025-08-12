import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Users } from "../components/CreateForm";

const initialState = {
    users: [],
    loading: false,
    error: null,
    searchPost: ''
}

export const createUser = createAsyncThunk('usersDetail/createUser', async (users: Users, {rejectWithValue}) => {
    try {
        const response = await axios.post('https://6899b533fed141b96ba06932.mockapi.io/crud', users);
        console.log(response.data, 'response');
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const fetchUsers = createAsyncThunk('fetchUsers', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get('https://6899b533fed141b96ba06932.mockapi.io/crud');
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const deleteUser = createAsyncThunk('deleteUser', async (id: any, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`https://6899b533fed141b96ba06932.mockapi.io/crud/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const updateUser = createAsyncThunk('updateUser', async (user: Users, {rejectWithValue}) => {
    console.log(user.id, 'user.id');
    try {
        const response = await axios.put(`https://6899b533fed141b96ba06932.mockapi.io/crud/${user.id}`, user);
        console.log(response, 'response');
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

const usersDetailSlice = createSlice({
    name: 'usersDetail',
    initialState,
    reducers: {
        searchPost: (state, action) => {
            state.searchPost = action.payload;
        }
    },
    extraReducers: (builder) => {
        // create user
        builder.addCase(createUser.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(createUser.fulfilled, (state: any, action: any) => {
            state.loading = false;
            state.users.push(action.payload);
        });
        builder.addCase(createUser.rejected, (state: any, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
        // get all users
        builder.addCase(fetchUsers.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state: any, action: any) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state: any, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
        // delete user
        builder.addCase(deleteUser.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state: any, action: any) => {
            state.loading = false;
            state.users = state.users.filter((user: any) => user.id !== action.payload.id);
        });
        builder.addCase(deleteUser.rejected, (state: any, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
        // update user
        builder.addCase(updateUser.pending, (state: any) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state: any, action: any) => {
            state.loading = false;
            state.users = state.users.map((user: any) => user.id === action.payload.id ? action.payload : user);
        });
        builder.addCase(updateUser.rejected, (state: any, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})

export const { searchPost } = usersDetailSlice.actions;

export default usersDetailSlice.reducer;