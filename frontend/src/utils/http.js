import Axios from "axios";

const http = Axios.create({
    // TODO: Move to .env
    baseURL: "http://localhost:5000",
    withCredentials: true,
})
