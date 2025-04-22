function isArray(input) {
    if (Array.isArray(input)) {
        return true
    } else {
        return false
    }
}

console.log(isArray('QA DOJO'));
console.log(isArray([1, 2, 4, 0]));

function cloneArray(arr) {
    return [...arr];
}

console.log(cloneArray([1, 2, 4, 0]));
console.log(cloneArray([1, 2, [4, 0]]));

function first(arr, n = 1) {
    if (n === 1) {
        return arr[0]
    } else {
        return arr.slice(0, n);
    }
}

console.log(first([7, 9, 0, -2]));
console.log(first([7, 9, 0, -2], 3));


function last(arr, n = 1) {
    return n === 1 ? arr[arr.length - 1] : arr.slice(-n);
}

console.log(last([7, 9, 0, -2]));
console.log(last([7, 9, 0, -2], 3));

function joinArray(arr, separator = ",") {
    return arr.join(separator);
}
const myColor = ["Red", "Green", "White", "Black"];
console.log(joinArray(myColor));
console.log(joinArray(myColor, '+'));

function addSeparatorBetwinEven(input) {
    let arr = [...input].map(Number);
    for (let i = 0; i < arr.length; i++) {

        if ((arr[i] % 2 === 0) && (arr[i + 1] % 2 === 0)) {
            arr[i] = arr[i] + '-'
        }
    }
    return arr.join("");
}

console.log(addSeparatorBetwinEven('0254681946'))

function sort(input) {
    let arrSorted = input.sort((a, b) => a - b);
    return arrSorted.join(",")
}

console.log(sort([2, 2, 4, 10, 1, -10]))


function createArray(arrLength) {
    let arr = new Array(arrLength)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = i + 1;
    }
    return arr;
}

console.log(createArray(345));

function SumIntervalNumbers(num1, num2) {
    let sum = 0
    for (let i = num1; i <= num2; i++) {
        sum = sum + i;
    }
    return sum;
}

console.log(SumIntervalNumbers(1,100))

function createReverseArray(arrLength) {
    let arr = new Array(arrLength-1)
    for (let i = arrLength; i > 0; i--) {
        arr[arrLength-i] = i;
    }
    return arr;
}

console.log(createReverseArray(10));

function maxNumber(a, b) {
    if (a > b) {
        return a;
    } else if (a < b) {
        return b;
    } else {
        return "Обидва числа рівні";
    }
}
console.log(maxNumber(10, 20));
console.log(maxNumber(5, 5));
console.log(maxNumber(-10, 0));
