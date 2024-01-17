import appAxios from './appAxios';

export const configureAxiosInterceptors = () => {

    appAxios.interceptors.request.use(async (config) => {
        const userToken = localStorage.getItem('userToken');
    
        if (userToken) {
            const token = `Bearer ${userToken}`;
            console.log('token:', token);
            config.headers.Authorization = token;
        } else {
            console.warn('No userToken found in localStorage.');
        }
    
        console.log("Request config:", config);
        return config;
    });
};

