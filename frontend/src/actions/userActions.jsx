import { loginRequest, loginSuccess, loginFail, clearError, 
        registerRequest, registerSuccess, registerFail,
        loadUserRequest, loadUserSuccess, loadUserFail,
        logoutFail, logoutSuccess,
        updateProfileFail, updateProfileRequest, updateProfileSuccess, clearUpdateProfile,
    } from "../slice/authSlice"
import axios from "axios";
export const login = (email, password) => async(dispatch) =>{
    try{
        dispatch(loginRequest);
        const {data} = await axios.post(`http://localhost:3000/auth/login`, {email, password});
        dispatch(loginSuccess(data));

    } catch(error){
        dispatch(loginFail(error.response.data.message));
    }
};

export const clearAuthError = dispatch =>{
    dispatch(clearError())
};

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`http://localhost:3000/auth/register`,userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

};

export const loadUser =  async (dispatch) => {

    try {
        dispatch(loadUserRequest())
       
        const { data }  = await axios.get(`http://localhost:3000/auth/myprofile`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }

};


export const logout =  async (dispatch) => {
    try {
        await axios.get(`http://localhost:3000/auth/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail(error.response.data.message))
    }

};

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.put(`http://localhost:3000/auth/update`,userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }

}