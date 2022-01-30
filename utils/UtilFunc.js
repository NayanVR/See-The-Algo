export function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function max(a, b) {
    return a > b ? a : b
}

export function toggleDisable(toDisbale) {
    document.querySelectorAll('.btn').forEach(ele => ele.disabled = toDisbale)
    document.querySelectorAll('.slider').forEach(ele => ele.disabled = toDisbale)
}

export function clearTheProcess(timeouts, setArray) {
    timeouts.forEach(ele => clearTimeout(ele))

    toggleDisable(false)
    
    let arr = []
    let bars = document.getElementsByClassName('array-bar')
    for (let i = 0; i < bars.length; i++) {
        arr.push(parseInt(bars[i].style.height, 10));
    }
    console.log('killing task', arr)
    setArray(arr)
}