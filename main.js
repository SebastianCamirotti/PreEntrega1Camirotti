class Wallet {
    constructor(income, expense){
        this.income = income;
        this.expense = expense;
    }
}

//Objeto para manejar los movimientos de dinero que se hagan.

class BudgetManager{
    constructor(){
        this.transactions = [];
    }
    addIncomes(){
            let addMoreIncomes = true;
            while(addMoreIncomes){
                let ask = prompt("Desea agregar un ingreso? (si, no)")
                if(ask == "si"){
                    let income = parseFloat(prompt("Agregar ingreso: "));
                    if (!isNaN(income)){
                        this.transactions.push(income);
                    }
                    else {
                        console.log("Ingrese un número válido.")
                    }
                }
                else if (ask == "no"){
                    break;
                }
                else{
                    alert("Ingrese una opción válida.");
                }
            }
    }

    addExpenses(){
            let addMoreExpenses = true;
            while(addMoreExpenses) {
                let ask = prompt("Desea agregar un gasto? (si, no)");
                if(ask == "si"){
                    let expense = parseFloat(prompt("Agregar gasto: "));
                    if (!isNaN(expense)){
                        this.transactions.push(-expense);
                    }
                    else{
                        console.log("Ingrese un número válido.");
                    }
                }
                else if (ask == "no"){
                    break;
                }
                else{
                    alert("Ingrese una opción válda.")
                }
            }
    }
    showTransactions(){
        console.log("Transacciones realizadas: ");
        this.transactions.forEach(transaction => {
            console.log(transaction);
        });
    }
    calculateBudget(){
        let total = this.transactions.reduce((acc, curr) => acc + curr, 0);
        console.log(`Transacciones realizadas: ${this.transactions}. El presupuesto total es ${total}`);
    }
}

const transaction = new BudgetManager();
transaction.addIncomes();
transaction.addExpenses();
transaction.showTransactions();
transaction.calculateBudget();