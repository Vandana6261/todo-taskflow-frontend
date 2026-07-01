import { BASE_URL } from "../config";

export async function sendOtp({ email }) {
    try {
        const res = await fetch(`${BASE_URL}/api/user/send-otp`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}


export async function varifyAndRegister(userData) {
    console.log(userData, "userData")
    try {
        let res = await fetch(`${BASE_URL}/api/user/varify-and-register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}