import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from './authSlice'
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUserFailed, getUserStart, getUserSuccess } from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('/v1/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post('/v1/auth/register', user)
        dispatch(registerSuccess())
        navigate('/login')
    } catch (error) {
        dispatch(registerFailed())
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart())
    try {
        // cần phải có token mới get all users
        const res = await axiosJWT.get('/v1/user', {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        dispatch(getUserFailed())
    }
}

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart())
    try {
        await axiosJWT.delete(`/v1/user/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(deleteUserSuccess("Xóa thành công"))

    } catch (error) {
        dispatch(deleteUserFailed('Xóa thất bại'))
    }
}

export const logout = async (accessToken, dispatch, navigate, id, axiosJWT) => {
    dispatch(logoutStart())
    try {
        await axiosJWT.post('/v1/auth/logout', id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(logoutSuccess())
        navigate('/login')
    } catch (error) {
        dispatch(logoutFailed())
    }
}