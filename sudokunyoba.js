let a = null
let soal = [
    [a, a, a, a, a, a, a, a, a],
    [a, 5, a, a, 5, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a]
]

let b = document.getElementsByClassName("kotakinput")

for (let i = 0; i < b.length; i++) {
    b[i].addEventListener("input", () => {
        cekInput(b[i].id);
      });
}

function mulai() {
    let sudokuAwal = [[]]
    let j = 0
    for (let i = 1; i <= 81; i++){
        let temp = document.getElementById(String(i)).value
        if (temp == ""){
            sudokuAwal[j].push(null)
        }
        else { 
            sudokuAwal[j].push(Number(temp))
        }
        if (i % 9 == 0 && i < 81){
            sudokuAwal.push([])
            j++
        }
    }
    let inputValid = valid(sudokuAwal)
    if (!inputValid) {
        swal("Salah input beul, cek lagi!")
        return
    } else {
        let selesai = solve(sudokuAwal)
        pushSudoku(selesai)
    }
}

function pushSudoku(arr) {
    let tampung = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            tampung.push(arr[i][j])
        }
    }
    for (let i = 1; i <= 81; i++) {
        let temp = document.getElementById(String(i))
        temp.value = tampung[i-1]
    }
}

function cekInput(tampungId) {
    let sudokuAwal = [[]]
    let j = 0
    for (let i = 1; i <= 81; i++){
        let temp = document.getElementById(String(i)).value
        if (temp == ""){
            sudokuAwal[j].push(null)
        }
        else { 
            sudokuAwal[j].push(Number(temp))
        }
        if (i % 9 == 0 && i < 81){
            sudokuAwal.push([])
            j++
        }
    }
    let inputValid = true
    inputValid = valid(sudokuAwal)
    let x = document.getElementById(tampungId)
    if (!inputValid) {
        x.classList.add("merah")
        swal("Salah input beul, cek lagi!")
        for (let i = 1; i <= 81; i++){
            let temp = document.getElementById(String(i))
            let lokasi = document.getElementById(tampungId)
            if (temp != lokasi) {
                temp.setAttribute("disabled", true)
            }
        }
        return
    } else if (inputValid) {
        x.classList.remove("merah")
        for (let i = 1; i <= 81; i++) {
            let temp = document.getElementById(String(i))
            temp.removeAttribute("disabled")

        }
    }
}

function solve(arrSudoku) {
    if (beres(arrSudoku)) {
        return arrSudoku
    } else {
        let branch = next(arrSudoku)
        let validArrSudoku = keepOnlyValid(branch)
        return searchForSolution(validArrSudoku)
    }
}

function beres(arrSudoku) {
    for (let i = 0; i <=8; i++) {
        for (let j = 0; j <= 8; j++) {
            if (arrSudoku[i][j] === null) {
                return false
            }
        }
    }
    return true
}

function searchForSolution(arrValid) {
    if (arrValid.length < 1) {
        return false
    } else {
        let temp = arrValid.shift()
        let path = solve(temp)
        if (path != false) {
            return path
        } else {
            return searchForSolution(arrValid)
        }
    }
}

function next(arrSudoku) {
    let output = []
    let kosong = findKosong(arrSudoku)
    if (kosong != undefined) {
        let y = kosong[0]
        let x = kosong[1]
        for (let i = 1; i <= 9; i++) {
            let newArrSudoku = [...arrSudoku]
            let baris = [...newArrSudoku[y]]
            baris[x] = i
            newArrSudoku[y] = baris
            output.push(newArrSudoku)
        }
    }
    return output
}

function findKosong(arrSudoku) {
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <=8; j++) {
            if (arrSudoku[i][j] == null) {
                return [i, j]
            }
        }
    }
}

function keepOnlyValid(arrNext) {
    let output = []
    for (let i = 0; i < arrNext.length; i++) {
        if (valid(arrNext[i])) {
            output.push(arrNext[i])
        }
    }
    return output
}

function valid(arrSudoku) {
    return cekBaris(arrSudoku) && cekKolom(arrSudoku) && cekKotak(arrSudoku)
}


function cekBaris(arrSudoku) {
    let baris = true
    for (let i = 0; i <= 8; i++) {
        let tampung = []
        for (let j = 0; j <= 8; j++) {
            if (tampung.includes(arrSudoku[i][j])) {
                baris = false
                // return baris
            }
            if (arrSudoku[i][j] != null) {
                tampung.push(arrSudoku[i][j])
            }
        }
    }
    console.log(baris)
    return baris
}

function cekKolom(arrSudoku) {
    let kolom = true
    for (let i = 0; i <= 8; i++) {
        let tampung = []
        for (let j = 0; j <= 8; j++) {
            if (tampung.includes(arrSudoku[j][i])) {
                kolom = false
                return kolom
            }
            if (arrSudoku[j][i] != null) {
                tampung.push(arrSudoku[j][i])
            }
        }
    }
    return kolom
}

function cekKotak(arrSudoku) {
    const arrKotak = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ]
    let kotak = true
    for (let y = 0; y <= 8; y += 3) {
        for (let x = 0; x <= 8; x += 3) {
            let tampung = []
            for (let i = 0; i <= 8; i++) {
                let coordinates = [...arrKotak[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (tampung.includes(arrSudoku[coordinates[0]][coordinates[1]])) {
                    kotak = false
                    return kotak
                }
                if (arrSudoku[coordinates[0]][coordinates[1]] != null) {
                    tampung.push(arrSudoku[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return kotak
}

let currentLeftNaga = -400
setInterval(() => {
  document.querySelector('.box').style.left = currentLeftNaga + "px"
  currentLeftNaga += 10
  if (currentLeftNaga >= window.innerWidth) {
      currentLeftNaga = -500
  }
}, 100);

let currentLeftAyam = -50
setInterval(() => {
  document.querySelector('.box2').style.left = currentLeftAyam + "px"
  currentLeftAyam += 10
  if (currentLeftAyam >= window.innerWidth + 350) {
      currentLeftAyam = -150
  }
}, 100);

function resetSudoku() {
    location.reload()
}