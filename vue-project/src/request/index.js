import axios from "axios";

const global_url = 'http://192.168.13.34/api'
export default async function ({url, data, errfn}, contentType) {

    const config = {
        headers: {}
    };

    if (contentType === 'json') {
        config.headers["Content-Type"] = 'application/json';
    }else {
        config.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    }

    if (url.startsWith("/i/")){
        config.headers["X-Authorization"] = localStorage.getItem("token");
    }

    try {
        const response = await axios.post(global_url + url, data, config);
        if (response.data.code === 200) {
            return response.data.result
        }else {
            let errorCode = response.data.code;
            let errorMessage = errorCode + ": ";
            if (errorCode !== 999) {
                errfn && errfn(response.data);
                errorMessage += response.data.message;
            } else {
        
                localStorage.removeItem("token");
                document.location.href="http://localhost:5173/login";
                
            }
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw new Error(error);
    }
}