// If VITE_BACKEND_URL is set (like on Vercel), it uses that.
// Otherwise, it uses the current hostname (e.g. localhost or 192.168.x.x) on port 5000.
// This is critical so that testing on a mobile phone (via local WiFi) works!
const devUrl = typeof window !== 'undefined' ? `http://${window.location.hostname}:5000` : "http://localhost:5000";



export const BASE_URL = import.meta.env.VITE_BACKEND_URL || devUrl;


// https://todo-taskflow-1.onrender.com