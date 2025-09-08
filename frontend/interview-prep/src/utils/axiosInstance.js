import axios from "axios";
import { BASE_URL } from "./apiPath";  

const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:80000,
    headers:{
        'Content-Type':'application/json',
        Accept:"application/json",
    },
});

//request interceptor to add the token to the headers
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

//Response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response){
            //handle common error globally
            if(error.response.status===401){
                //Redirect to login or handle unauthorized access
                window.location.href="/login";
            }
            else if(error.response.status===500){
                console.error("Server error, please try again later.");
            }
        }
        else if(error.code==="ECONNABORTED" ){
            console.error("Request timed out, please try again.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;