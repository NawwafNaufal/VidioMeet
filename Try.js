const data = {
    name : 'naufal',
    umur : 13,
    noHp : '94839843984',
    nik : '837483748374873'
}

const angka = [1,2,2,2,2,4,2]

const change = {...data}

const cariName = Object.values(data).some(d => d === 13)
const cari = angka.some(a => a === 1)

const result = change.umur + 49
console.log(cari)

const hh = data.name = 'ucup'
console.log(data.name)


const validasi = data.som