module.exports = {
    cookieAccesToken : {
        httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : 1 * 60 * 60 * 1000
    },
    cookieRefreshToken : {
        httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : 30 * 24 * 60 * 60 * 1000
    }
}