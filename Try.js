const data = {
    name : 'naufal',
    umur : 13,
    noHp : '94839843984',
    nik : '837483748374873'
}


const hh = data.name = 'ucup'

console.log(data.name)

const arr = ['aple','gedang','jambu','wortel','melon']

arr.forEach((index,value) => {
    console.log(index,value)
})

console.log(data)

class angka {
    constructor(a) {
        this.a = [1,2,3,4,5,6,7,8,9]
    }
}

class user extends angka {
    constructor(email,password,a) {
        super(a)
        this.email = email,
        this.password = password
    }
}

const value = new user('n@gmail.com','1234565')
console.log(value)

