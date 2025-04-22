
function isOdd(number: number) {
    if (number % 2 !== 0) {
        console.log("number is odd");
        return true;
    } else {
        console.log("number is even");
        return false;
    }
}

function sayGreeting(time: number) {
    if (time >= 0 && time <= 24) {
        if (time < 12) {
            console.log("Доброго ранку!");
        }
        else if (time > 18) {
            console.log("Доброго дня!");
        }
        else {
            console.log("Доброго вечора");
        }
    } else {
        console.log("Please use time in interval [0;24]");
    }
}

isTestPassed(33);
function isTestPassed(number) {
    if (typeof number === "number") {
        if (number >= 50) {
            console.log("Тест складено");
            return true;
        } else {
            console.log("Тест не складено");
            return false;
        }
    } else {
        throw Error("pls use number to check if test is passed");
    }
}

function isVoutingAllowed(age: number) {
    if (age >= 18) {
        console.log("Ви можете голосувати.");
        return true;
    } else {
        console.log("Ви ще не можете голосувати.");
        return false;
    }
}

function comparingNumbers(firstNumber: number, secondNumber: number) {
    if (firstNumber > secondNumber) {
        console.log("Перше більше");
    }
    else if (firstNumber < secondNumber) {
        console.log("Друге більше");
    }
    else {
        console.log("Числа рівні");
    }
}

function trafficLight(color: string) {
    color = color.toLowerCase();

    if (color === "зелений") {
        console.log("Переходьте");
    } else if (color === "жовтий") {
        console.log("Підготуйтеся");
    } else if (color === "червоний") {
        console.log("Зачекайте");
    } else {
        console.log("Невідомий колір світлофора");
    }
}

numberType(20);
function numberType(number: number) {
    if (number > 0) {
        console.log("Число додатнє.");
    } else if (number < 0) {
        console.log("Число від’ємне.");
    } else {
        console.log("Число дорівнює нулю.");
    }
}


