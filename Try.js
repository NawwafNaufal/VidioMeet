const key = "nama kamu siapa"
const value = "icha"

const obb = {
    [key] : value
}

console.log(obb)

const tanggal = "23-02-2003"

const con = new Date(tanggal)


const date = "2000-12-02T17:00:00.000Z"
const newd = new Date(date)
console.log(con)
console.log(newd.toLocaleString())

console.log(key.split())

const data = []

data.push(30)
data.push(40)
data.push(50)
data.push(60)


data.forEach(num => console.log(num + 10))

for (let i of data){
    console.log([i][2])
}



const isiData = {}

isiData.nama = "Naufal"
isiData.umur = 22
isiData.tempatTinggal = "Lamongan"

console.log(isiData)


const angka = 10000
