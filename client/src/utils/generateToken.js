import axios from "axios";

const generateToken = async (email) => {
    const response = await axios.post(
        "http://localhost:9000/generate-token",
        { email },
        { withCredentials: true }
    );

    const token = response.data?.token;
    // console.log("token from the generete token ", token)

    if (token) {
        localStorage.setItem("access-token", token);
        // console.log("res from token gene", token);
    }

};

export default generateToken;