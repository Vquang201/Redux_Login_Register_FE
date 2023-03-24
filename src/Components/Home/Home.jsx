import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../Redux/apiRequest";
import { loginSuccess } from "../../Redux/authSlice";
import { createAxios } from "../../createInstance"
import "./index.css";

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // ?. Optional chaining
    const user = useSelector(state => state.auth.login?.currentUser)
    const userList = useSelector(state => state.users.users?.allUser)
    const msg = useSelector(state => state.users?.msg)
    let axiosJWT = createAxios(user, dispatch, loginSuccess)




    // //REFRESH TOKEN 
    // const refreshToken = async () => {
    //     try {
    //         const res = await axios.post('/v1/auth/refresh', {
    //             withCredentials: true
    //         })
    //         // withCredentials thêm cookie có sẵn

    //         return res.data
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // axiosJWT.interceptors.request.use(
    //     async (config) => {
    //         let date = new Date()
    //         // giải mã token
    //         const decodeToken = jwt_decode(user?.accessToken)
    //         if (decodeToken.exp < date.getTime() / 1000) {
    //             const data = await refreshToken()
    //             const refreshUser = {
    //                 ...user,
    //                 // tạo access token mới
    //                 accessToken: data.accessToken
    //             }
    //             dispatch(loginSuccess(refreshUser))
    //             config.headers['token'] = `Bearer ${data.accessToken}`
    //         }
    //         return config
    //     },
    //     (err) => Promise.reject(err)
    // )

    useEffect(() => {
        if (!user) {
            console.log("bạn chưa đăng nhập")
            navigate('/login')
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch, axiosJWT)
        }
    }, [])

    const handleDelete = (id) => {
        deleteUser(user?.accessToken, dispatch, id, axiosJWT)
    }

    return (
        <main className="home-container">
            <div className="home-title">User List</div>
            <div>
                Your Role : {user?.isAdmin ? 'Admin' : 'User'}
            </div>
            <div className="home-userlist">
                {userList?.map((user) => {
                    return (
                        <div className="user-container">
                            <div className="home-user">{user.username}</div>
                            <div className="delete-user" onClick={() => handleDelete(user._id)}> Delete </div>
                        </div>
                    );
                })}
                <div style={{ color: 'red' }}>{msg}</div>
            </div>

        </main>
    );
};

export default Home;