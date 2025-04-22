const car = {
    color: 'red',
    siza: 'small',
    wheelsNamber: 4,
    doorNumber: 5,
    mass: 5000,
    maxspeed: 180,
    brand: 'Mazda',
    model: 'CX-5',
    releaseYear: 2024,
    startEngine: () => { console.log('Врумм!') },
    drive: () => { console.log('Машина їде!') },
    driveMax: function () { console.log(`Я їду зі щвидкістю ${this.maxspeed} км\год`) },
}

car.startEngine();
car.drive();
car.driveMax();

class Car {
    color: string = 'yellow';
    siza: string = 'small';
    wheelsNamber: number = 4;
    doorNumber: number = 5;
    mass: number = 5000;
    maxspeed: number = 180;
    brand: string = 'Mazda';
    model: string = 'CX-5';
    releaseYear: number = 2024;

    constructor(color:string){
        this.color = color;
    }

    startEngine() {
        console.log('Врумм!')
    };

    drive() {
        console.log('Машина їде!')
    };

    driveMax() {
        console.log(`Я їду зі щвидкістю ${this.maxspeed} км\год`)
    };
}

const yellowCar = new Car('yelow');
const yellowCar2 = new Car('black');
console.log(yellowCar.color)
console.log(yellowCar2.color)