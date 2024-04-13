// Initialize results object to store semi-prime and brilliant numbers
let results = {
    "semi": [],
    "brilliant": []
};

// Function to initialize the webpage and add event listener to the Calculate button
function init() {
    document.getElementById("submitButton").addEventListener("click", onClick);
}

// Event handler for the Calculate button
function onClick() {
    // Reset results object and remove existing table if any
    results = {
        "semi": [],
        "brilliant": []
    };
    let existingTable = document.querySelector('.tableDiv');
    if (existingTable) {
        existingTable.remove();
    }

    // Get user input value
    let inputValue = document.getElementById("txtInput").value;

    // Check if input is a positive integer
    if (Math.floor(inputValue) == inputValue && parseInt(inputValue) > 0) {
        inputValue = parseInt(inputValue);
        calculateNum(inputValue);
    } else {
        // Display error message for invalid input
        let errorDiv = document.createElement("div");
        errorDiv.classList.add("errorDiv");
        let okButton = document.createElement("button");
        okButton.textContent = "OK";
        let errorMessage = document.createElement("h2");
        errorMessage.textContent = "Invalid Input!";
        errorDiv.appendChild(errorMessage);
        okButton.addEventListener("click", function() {
            errorDiv.remove();
        });
        errorDiv.appendChild(okButton);
        document.body.appendChild(errorDiv);
    }
}

// Function to calculate and display numbers in the table
function calculateNum(number) {
    let table = document.createElement('table');
    table.classList.add("tableDiv");
    let columnsNum = 10;
    let rows = Math.ceil(number / 10); // Calculate number of rows (rounded up)
    let currentNumber = 0; // Start from number 1

    // Create table rows and cells for numbers
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        let currentRow = document.createElement('tr');
        for (let columnIndex = 0; columnIndex < columnsNum; columnIndex++) {
            currentNumber++;
            let tableCell = document.createElement('td');
            if (currentNumber <= number) {
                tableCell.textContent = currentNumber;
                isSemiPrime(currentNumber, tableCell);
            }
            currentRow.appendChild(tableCell);
        }
        table.appendChild(currentRow);
    }

    // Append table to contentD div
    const contentD = document.querySelector('.contentD');
    contentD.appendChild(table);
}

// Function to check if a number is semi-prime and mark table cell accordingly
function isSemiPrime(number, cell) {
    let counter = 0;
    let array = [];
    for (let index = 2; index < number; index++) {
        if (number % index === 0) {
            if (!isPrime(index)) {
                counter = 0;
                break;
            }
            array.push(index);
            counter++;
        }
    }
    if (counter === 1 || (counter === 2 && isBrilliant(array))) {
        cell.id = "brilliant";
        results.brilliant.push({
            "b": number.toString()
        });
        results.semi.push({
            "s": number.toString()
        });
    } else if (counter === 2) {
        cell.id = "semi-prime";
        results.semi.push({
            "s": number.toString()
        });
    } else {
        cell.id = "normal";
    }
}

// Function to check if two numbers are both prime and have the same number of digits
function isBrilliant(arr) {
    let num1Digits = arr[0].toString().length;
    let num2Digits = arr[1].toString().length;
    return num1Digits === num2Digits;
}

// Function to check if a number is prime
function isPrime(number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) return false;
    }
    return true;
}

// Function to return the results object as a JSON string
function getResults() {
    return JSON.stringify(results);
}