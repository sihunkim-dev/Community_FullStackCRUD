// src/utils/jwtUtils.js
export function getUserInfo() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    // "Bearer "가 포함되어 있다면 제거 (혹시 모를 중복 방지)
    const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    try {
        // JWT의 두 번째 부분(Payload)을 디코딩
        const base64Url = cleanToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Token decode failed", error);
        return null;
    }
}