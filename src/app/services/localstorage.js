export const TOKEN_KEY = "jwt-token";
export const REFRESH_KEY = "jwt-refresh-token";
export const EXPIRES_KEY = "jwt-expires";
export const USERID_KEY = "user-local-id";

export function setTokens({ refreshToken, idToken, expiresIn = 3600, localId }) {
    const expiresData = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(EXPIRES_KEY, expiresData);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}
export function getExpiresData() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresData,
    getUserId,
    removeAuthData
};

export default localStorageService;
