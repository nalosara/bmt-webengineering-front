import appAxios from './appAxios';

export const configureAxiosInterceptors = () => {

    appAxios.interceptors.request.use(async (config) => {
        const userToken = localStorage.getItem('userToken');
    
        if (userToken) {
            const token = `Bearer ${userToken}`;
            config.headers.Authorization = token;
        } else {
            console.warn('No userToken found in localStorage.');
        }
    
        return config;
    });
};