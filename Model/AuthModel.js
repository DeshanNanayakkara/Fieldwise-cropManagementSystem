// Get JWT Token from Cookies
function getJwtTokenFromCookies() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === 'JWT') {
            return value;
        }
    }
    return null; // Return null if token not found
}

// Save JWT Token in Cookies
function saveJwtTokenToCookie(token) {
    document.cookie = `JWT=${token}; path=/; max-age=3600; secure; SameSite=Strict`; 
    // `max-age=3600` means the token will expire in 1 hour.
}

export{ getJwtTokenFromCookies, saveJwtTokenToCookie}
