document.addEventListener("DOMContentLoaded", function(){
    let ingresos = {};
    let gastos = {};
    let totalPresupuesto = 0;

    // Cargar datos desde localStorage cuando la página se carga
    cargarDatosDesdeLocalStorage();

    // Manejar cambio en el select de mes
    document.querySelector(".month-select").addEventListener("change", function(event) {
        let mesSeleccionado = event.target.value;
        // Actualizar transacciones y presupuesto para el mes seleccionado
        actualizarTransacciones(mesSeleccionado);
        actualizarPresupuesto(mesSeleccionado);
    });

    document.querySelector(".btn-success").addEventListener("click", function(event) {
        event.preventDefault();
        let ingreso = parseFloat(document.querySelector(".income-input").value);
        let descripcion = document.querySelector("#income-descripcion").value;
        let mesSeleccionado = document.querySelector(".month-select").value;
        if (!isNaN(ingreso) && ingreso > 0) {
            // Almacena el ingreso en el mes seleccionado
            if (!ingresos[mesSeleccionado]) {
                ingresos[mesSeleccionado] = [];
            }
            ingresos[mesSeleccionado].push({monto: ingreso, descripcion: descripcion});
            guardarDatosEnLocalStorage();
            actualizarTransacciones(mesSeleccionado);
            actualizarPresupuesto(mesSeleccionado);
            document.querySelector(".income-input").value = "";
            document.querySelector("#income-descripcion").value = "";
        }
    });

    document.querySelector(".btn-danger").addEventListener("click", function(event) {
        event.preventDefault();
        let gasto = parseFloat(document.querySelector(".expense-input").value);
        let descripcion = document.querySelector("#expense-descripcion").value;
        let mesSeleccionado = document.querySelector(".month-select").value;
        if (!isNaN(gasto) && gasto > 0) {
            // Almacena el gasto en el mes seleccionado
            if (!gastos[mesSeleccionado]) {
                gastos[mesSeleccionado] = [];
            }
            gastos[mesSeleccionado].push({monto: gasto, descripcion: descripcion});
            guardarDatosEnLocalStorage();
            actualizarTransacciones(mesSeleccionado);
            actualizarPresupuesto(mesSeleccionado);
            document.querySelector(".expense-input").value = "";
            document.querySelector("#expense-descripcion").value = "";
        }
    });

    function actualizarTransacciones(mesSeleccionado) {
        let transaccionesHTML = "";
        // Muestra las transacciones del mes seleccionado
        if (ingresos[mesSeleccionado]) {
            ingresos[mesSeleccionado].forEach(function(ingreso, index){
                transaccionesHTML += `<li class="transaction-item text-success">+ $${ingreso.monto.toFixed(2)} (${ingreso.descripcion})</li>`
            });
        }
        if (gastos[mesSeleccionado]) {
            gastos[mesSeleccionado].forEach(function(gasto, index) {
                transaccionesHTML += `<li class="transaction-item text-danger">- $${gasto.monto.toFixed(2)} (${gasto.descripcion})</li>`
            });
        }
        document.querySelector(".transaction-list").innerHTML = transaccionesHTML;
    }

    function actualizarPresupuesto(mesSeleccionado) {
        let totalIngresos = 0;
        let totalGastos = 0;
        // Calcula el total de ingresos y gastos del mes seleccionado
        if (ingresos[mesSeleccionado]) {
            totalIngresos = ingresos[mesSeleccionado].reduce(function (total, ingreso) {
                return total + ingreso.monto;
            }, 0);
        }
        if (gastos[mesSeleccionado]) {
            totalGastos = gastos[mesSeleccionado].reduce(function(total, gasto) {
                return total + gasto.monto;
            }, 0);
        }
        totalPresupuesto = totalIngresos - totalGastos;
        document.querySelector(".total-budget").textContent = "Total: $" + totalPresupuesto.toFixed(2);
    }

    function guardarDatosEnLocalStorage() {
        localStorage.setItem('ingresos', JSON.stringify(ingresos));
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }

    function cargarDatosDesdeLocalStorage() {
        if (localStorage.getItem('ingresos')) {
            ingresos = JSON.parse(localStorage.getItem('ingresos'));
        }
        if (localStorage.getItem('gastos')) {
            gastos = JSON.parse(localStorage.getItem('gastos'));
        }
        // Obtener mes seleccionado o utilizar el mes actual por defecto
        let mesSeleccionado = document.querySelector(".month-select").value || (new Date().getMonth() + 1).toString();
        actualizarTransacciones(mesSeleccionado);
        actualizarPresupuesto(mesSeleccionado);
    }

});
