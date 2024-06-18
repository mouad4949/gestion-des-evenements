import axios from "axios";

export const axiosClient = axios.create({

    baseURL: import.meta.env.VITE_BACKEND_URL ,
    withCredentials: true,

    withXSRFToken: true,

})

// import axios from "axios";

// export const axiosClient = axios.create({
//     baseURL: 'http://localhost:8000/api/', // Correctly defined baseURL
//     withCredentials: true,
//     withXSRFToken: true, // This is not a valid axios configuration option
// });
