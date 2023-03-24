import axios from "axios"
import jwt_decode from 'jwt-decode'

//REFRESH TOKEN 
const refreshToken = async () => {
    try {
        const res = await axios.post('/v1/auth/refresh', {
            withCredentials: true
        })
        // withCredentials thêm cookie có sẵn

        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createAxios = (user, dispatch, stateSuccess) => {
    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(
        async (config) => {
            let date = new Date()
            // giải mã token
            const decodeToken = jwt_decode(user?.accessToken)
            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken()
                const refreshUser = {
                    ...user,
                    // tạo access token mới
                    accessToken: data.accessToken
                }
                dispatch(stateSuccess(refreshUser))
                config.headers['token'] = `Bearer ${data.accessToken}`
            }
            return config
        },
        (err) => Promise.reject(err)
    )
    return axiosJWT
} 