import axios from "axios";

const RESTcall = ({
    url,
    method = "GET",
    headers = {},
    data = {}
}) => {
    let params = null;

    if (method === "GET") {
        params = data;
        data = null;
    }


    return axios({
        url,
        method,
        headers,
        params,
        data
    })
};

export default RESTcall;
