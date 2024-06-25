import axios from 'axios';

export default defineNuxtPlugin(async () => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        // Tambahan header lainnya sesuai kebutuhan
      },
    });
  
    return {
        // Memberikan layanan axios untuk digunakan di aplikasi
        provide: {
        axios: axiosInstance,
        },
    };
});

// export default defineNuxtPlugin(async() => {
//     return {
//         provide: {
//             axios: axios
//         }
//     }
// })