const key = "nama"
const value = "icha"

const obb = {
    [key] : value
}

console.log(obb)

const tanggal = "23-02-2003"
const date = "2000-12-02T17:00:00.000Z"
const newd = new Date(date)

const con = new Date(tanggal)


console.log(con)
console.log(newd.toLocaleString())