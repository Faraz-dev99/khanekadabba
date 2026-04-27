export const BASE_URL = "http://localhost:5001/api";

export const API_ROUTES = {

    CUSTOMER: {
        GET_ALL: `${BASE_URL}/customer`,
        GET_BY_ID: (id: string) => `${BASE_URL}/customer/${id}`,
    },

    FOLLOWUPS: {
        CUSTOMER: {
            GET_ALL: `${BASE_URL}/cus/followup`,
        },

    },




    AUTH: {
        // Public Routes
        SIGNUP: `${BASE_URL}/auth/signup`,
        LOGIN: `${BASE_URL}/auth/login`,
        LOGOUT: `${BASE_URL}/auth/logout`,

        //Protected Routes
        GETME: `${BASE_URL}/auth/getme`,

        // Admin Management

    },
};
