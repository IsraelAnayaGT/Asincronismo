function suma(num1, num2){
    return num1 + num2;
}

function resta(num1, num2){
    return num1 - num2;
}

function multiplicacion(num1, num2){
    return num1 * num2;
}

function divicion(num1, num2){
    return num1 / num2;
}

function calc( num1, num2, callback){
    return callback(num1, num2);
};

console.log(calc(2,2,suma));
console.log(calc(2,2,resta));
console.log(calc(2,2,multiplicacion));
console.log(calc(2,2,divicion));

setTimeout(function (){
console.log("Hola JavaScript");
}, 5000);

function saludo(name){
    console.log(`Hola ${name}`)
}
setTimeout(saludo,2000, "Israel");