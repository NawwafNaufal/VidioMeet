const expiresAtTime = () => {
        const date = new Date()
        const dateEx = new Date(date.getTime() + 5 * 60 * 1000)

        return {dateEx,date}
}

module.exports = expiresAtTime