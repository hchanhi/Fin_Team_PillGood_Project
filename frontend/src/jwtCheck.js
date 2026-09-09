// JWT는 클라이언트에서 서명 검증하지 않는다(검증은 서버 몫).
// 여기서는 payload 디코딩과 만료 확인만 한다.
function decodePayload(token) {
    if (!token || !token.accessToken) {
        return null;
    }
    try {
        const base64 = token.accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch (err) {
        return null;
    }
}

export function isAuth(token) {
    const payload = decodePayload(token);
    if (!payload || payload.exp * 1000 < Date.now()) {
        return false;
    }
    return payload;
}

export function getNickName(token) {
    return decodePayload(token)?.iss;
}

export function getId(token) {
    return decodePayload(token)?.sub;
}
