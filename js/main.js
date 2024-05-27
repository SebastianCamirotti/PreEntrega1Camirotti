document.addEventListener("DOMContentLoaded", function () {
    const ingresos = {};
    const gastos = {};
    let totalPresupuesto = 0;

    /* Cargar datos del archivo JSON */
    fetch('transacciones.json')
        .then(response => response.json())
        .then(data => {
            for (const mes in data) {
                ingresos[mes] = data[mes].ingresos;
                gastos[mes] = data[mes].gastos;
            }
            const mesSeleccionado = document.querySelector(".month-select").value;
            actualizarTransacciones(mesSeleccionado);
            actualizarPresupuesto(mesSeleccionado);
        })
        .catch(error => console.error('Error al cargar transacciones:', error));

    document.querySelector(".btn-success").addEventListener("click", function (event) {
        event.preventDefault();
        let ingreso = parseFloat(document.querySelector(".income-input").value);
        let descripcion = document.querySelector("#income-descripcion").value;
        let mesSeleccionado = document.querySelector(".month-select").value;

        if (!isNaN(ingreso) && ingreso > 0) {
            if (!ingresos[mesSeleccionado]) ingresos[mesSeleccionado] = [];
            ingresos[mesSeleccionado].push({ monto: ingreso, descripcion: descripcion });
            actualizarTransacciones(mesSeleccionado);
            actualizarPresupuesto(mesSeleccionado);
            guardarDatosEnLocalStorage();
            document.querySelector(".income-input").value = "";
            document.querySelector("#income-descripcion").value = "";

            /* Notificación Toastify ingreso agregado */
            Toastify({
                text: "Ingreso agregado!",
                duration: 3000,
                style: {
                    background: "#97BE5A"
                  }
            }).showToast();
        }
    });

    document.querySelector(".btn-danger").addEventListener("click", function (event) {
        event.preventDefault();
        let gasto = parseFloat(document.querySelector(".expense-input").value);
        let descripcion = document.querySelector("#expense-descripcion").value;
        let mesSeleccionado = document.querySelector(".month-select").value;

        if (!isNaN(gasto) && gasto > 0) {
            if (!gastos[mesSeleccionado]) gastos[mesSeleccionado] = [];
            gastos[mesSeleccionado].push({ monto: gasto, descripcion: descripcion });
            actualizarTransacciones(mesSeleccionado);
            actualizarPresupuesto(mesSeleccionado);
            guardarDatosEnLocalStorage();
            document.querySelector(".expense-input").value = "";
            document.querySelector("#expense-descripcion").value = "";

            /* Notificación Toastify gasto agregado */
            Toastify({
                text: "Gasto agregado!",
                duration: 3000,
                style: {
                    background: "#FF0000"
                  }
            }).showToast();
        }
    });

    document.querySelector(".transaction-list").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-transaction")) {
            let indice = parseInt(event.target.getAttribute("data-indice"));
            let clase = event.target.classList.contains("income") ? "income" : "expense";
            let mesSeleccionado = document.querySelector(".month-select").value;

            if (clase === "income") {
                ingresos[mesSeleccionado].splice(indice, 1);
            } else {
                gastos[mesSeleccionado].splice(indice, 1);
            }

            actualizarTransacciones(mesSeleccionado);
            actualizarPresupuesto(mesSeleccionado);
            guardarDatosEnLocalStorage();

            /* Notificación Toastify transacción eliminada*/
            Toastify({
                text: "Transacción eliminada!",
                duration: 3000,
                style: {
                    background: "#028391"
                  }
            }).showToast();
        }
    });

    function actualizarTransacciones(mes) {
        let transaccionesHTML = "";
        if (ingresos[mes]) {
            ingresos[mes].forEach((ingreso, index) => {
                transaccionesHTML += `<li class="transaction-item text-success">+ $${ingreso.monto.toFixed(2)} (${ingreso.descripcion}) <button class="btn btn-sm delete-transaction income" data-indice="${index}">&times;</button></li>`;
            });
        }
        if (gastos[mes]) {
            gastos[mes].forEach((gasto, index) => {
                transaccionesHTML += `<li class="transaction-item text-danger">- $${gasto.monto.toFixed(2)} (${gasto.descripcion}) <button class="btn btn-sm delete-transaction expense" data-indice="${index}">&times;</button></li>`;
            });
        }
        document.querySelector(".transaction-list").innerHTML = transaccionesHTML;
    }

    function actualizarPresupuesto(mes) {
        let totalIngresos = ingresos[mes] ? ingresos[mes].reduce((total, ingreso) => total + ingreso.monto, 0) : 0;
        let totalGastos = gastos[mes] ? gastos[mes].reduce((total, gasto) => total + gasto.monto, 0) : 0;
        totalPresupuesto = totalIngresos - totalGastos;
        document.querySelector(".total-budget").textContent = `Total: $${totalPresupuesto.toFixed(2)}`;
    }

    function guardarDatosEnLocalStorage() {
        localStorage.setItem("ingresos", JSON.stringify(ingresos));
        localStorage.setItem("gastos", JSON.stringify(gastos));
    }

    function cargarDatosDeLocalStorage() {
        let ingresosGuardados = localStorage.getItem("ingresos");
        let gastosGuardados = localStorage.getItem("gastos");
        if (ingresosGuardados) Object.assign(ingresos, JSON.parse(ingresosGuardados));
        if (gastosGuardados) Object.assign(gastos, JSON.parse(gastosGuardados));
    }

    cargarDatosDeLocalStorage();

    document.querySelector(".month-select").addEventListener("change", function () {
        let mesSeleccionado = document.querySelector(".month-select").value;
        actualizarTransacciones(mesSeleccionado);
        actualizarPresupuesto(mesSeleccionado);
    });

    const mesInicial = document.querySelector(".month-select").value;
    actualizarTransacciones(mesInicial);
    actualizarPresupuesto(mesInicial);
});
