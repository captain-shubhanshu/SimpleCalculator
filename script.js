class Calculator {
    constructor(resultElement, historyElement) {
        this.resultElement = resultElement;
        this.historyElement = historyElement;
        this.clearScreen();
    }

    clearScreen() {
        this.resultElement.innerText = "";
        this.historyElement.innerText = "";
    }

    printHistory(expr) {
        this.historyElement.innerText = expr;
    }

    printResult(expr) {
        this.resultElement.innerText = eval(expr);
    }

    evaluate() {
        this.printHistory(this.resultElement.innerText);
        this.printResult(this.resultElement.innerText);
    }

    deleteExpression() {
        let output = this.resultElement.innerText;
        this.resultElement.innerText = output.substring(0, output.length - 1);
    }
}

const result = document.querySelector("div.result");
const history = document.querySelector("div.history");
const numberKeys = document.querySelectorAll("button.number");
const operatorKeys = document.querySelectorAll("button.operator");

let calc = new Calculator(result, history);

let equalKeyStatus = false;

numberKeys.forEach((key) => {
    key.addEventListener("click", () => {
        let output = calc.resultElement.innerText;
        if (output != "" && output.length == 1 && output.startsWith("0")) {
            calc.resultElement.innerText = key.innerHTML;
        } else if (key.innerHTML == "." && output.includes(".")) {
            return;
        } else {
            if (equalKeyStatus == false) {
                calc.resultElement.innerText += key.innerHTML;
            } else {
                equalKeyStatus = false;
                calc.resultElement.innerText = key.innerHTML;
            }
        }
    });
});

operatorKeys.forEach((key) => {
    key.addEventListener("click", () => {
        let operator = key.innerHTML;
        let output = calc.resultElement.innerText;
        if (operator == "AC") {
            calc.clearScreen();
        } else if (operator == "DEL") {
            calc.deleteExpression();
        } else if (output != "") {
            if (operator == "=") {
                equalKeyStatus = true;
                calc.evaluate();
            } else if (
                output.endsWith("/") ||
                output.endsWith("*") ||
                output.endsWith("+") ||
                output.endsWith("–")
            ) {
                calc.resultElement.innerText =
                    output.substring(0, output.length - 1) + operator;
            } else if (output.endsWith(".")) {
                return;
            } else {
                calc.resultElement.innerText += operator;
            }
        }
    });
});
