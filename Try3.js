const story = `Pada suatu hari yang cerah, Kancil sedang berjalan dengan santai di pinggir sungai. 
                Disana ia bertemu dengan Siput yang merangkak dengan lambat. Kancil lalu datang 
                menghampiri Siput dengan langkah yang angkuh.Pada suatu hari yang cerah, 
                Kancil sedang berjalan dengan santai di pinggir sungai. Disana ia bertemu 
                dengan Siput yang merangkak dengan lambat. Kancil lalu datang menghampiri 
                Siput dengan langkah yang angkuh.`

const arr = story.split(" ")

const sensorWord = new Map([
    ["Siput","*****"]
])

const getWord = ["Kancil","Siput"]

const result = arr.some((chek) => chek === "Nawwsaf")
const filtered = arr.filter((fill) => fill === "Nawwaf")
const filteredSome = getWord.filter(fill => arr.some(word => word === fill))

const sensor = arr.map(w => sensorWord.get(w) || w).join(" ")

console.log(result)
console.log(filtered)
console.log(filteredSome)
console.log(sensor)