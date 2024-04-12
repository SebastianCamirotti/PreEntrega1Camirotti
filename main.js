let user;
let validOption = false;

// Bucle para asegurarse de que el usuario ingrese una opción válida
while (!validOption) {
    user = prompt("Bievenido al simulador de prestamos. Seleccione una opción: 1) Prestamos sin interés. 2) Prestamos con interés. 3) Prestamo universitario.");

    if (user === "1" || user === "2" || user === "3") {
        validOption = true;
    } else {
        alert("Opción incorrecta. Por favor, seleccione una opción válida.");
    }
}

let salary = parseInt(prompt("Ingrese su sueldo en USD: "));

if (user === "1") {
    let amount = parseInt(prompt("Ingrese el monto que desea en USD: "));
    if (salary > (amount) * 2) {
        let payments = parseInt(prompt("Ingrese el numero de cuotas (hasta 3, sin interés): "));
        let result = amount / payments;
        alert(`Deberás pagar ${payments} cuotas de ${result} USD`);
    } else if (salary < (amount) * 2) {
        alert("Sueldo insuficiente para solicitar este préstamo.")
    } else {
        alert("Opción incorrecta.")
    }
}

if (user === "2") {
    let amount = parseInt(prompt("Ingrese el monto que desea en USD: "));
    if (salary > amount) {
        let payments = parseInt(prompt("Ingrese el numero de cuotas (hasta 24, con 35% de interés): "));
        let result = (amount / payments) + 0.35; // 35% de interés.
        alert(`Deberás pagar ${payments} cuotas de ${result} USD`);
    } else if (salary < (amount) * 2) {
        alert("Sueldo insuficiente para solicitar este préstamo.")
    } else {
        alert("Opción incorrecta.")
    }
}

if (user === "3") {
    let amount = parseInt(prompt("Si sos estuidante universitario ingresa el monto que desea en USD: "));
    if (salary > amount) {
        let payments = parseInt(prompt("Ingrese el numero de cuotas (hasta 36, con 15% de interés): "));
        let result = (amount / payments) + 0.15; // 15% de interés.
        alert(`Deberás pagar ${payments} cuotas de ${result} USD. Acordate de presentar la constancia de estudios.`);
    } else if (salary < (amount) * 2) {
        alert("Sueldo insuficiente para solicitar este préstamo.")
    } else {
        alert("Opción incorrecta.")
    }
}
