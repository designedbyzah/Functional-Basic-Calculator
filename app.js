document.addEventListener("DOMContentLoaded", function () {
  const displayArea = document.getElementById("displayarea");
  const numberButtons = document.querySelectorAll(".btn-num");
  const operatorButtons = document.querySelectorAll(".btn-opr");
  const equalsToButton = document.getElementById("equalsto-btn");

  // Append number buttons to display area

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (displayArea.value === "0") {
        displayArea.value = ""; // Clear initial '0'
      }
      displayArea.value += button.textContent.trim(); // Add the number to the display
    });
  });

  // Append operator buttons to display area with proper mapping
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let operator = button.textContent.trim(); // Get the operator from the button

      // Correct mapping for HTML character entities
      switch (operator) {
        case "÷":
          operator = "/";
          break;
        case "×":
          operator = "*";
          break;
        case "−":
          operator = "-";
          break;
        case "+":
          operator = "+";
          break;
        default:
          operator = ""; // Default case to avoid issues
          break;
      }
      displayArea.value += ` ${operator} `; // Append the operator to the display
    });
  });

  // Calculate and display the result on clicking equalsTo
  equalsToButton.addEventListener("click", () => {
    try {
      // Clean up the input, removing any non-numeric or non-operator characters
      const expression = displayArea.value.replace(/[^0-9+/*-.]/g, "");
      const result = Function('"use strict"; return (' + expression + ")")(); // Evaluate the expression

      // Limit decimal places to avoid long results
      const roundedResult = parseFloat(result.toFixed(11));

      displayArea.value = roundedResult; // Display the result
    } catch (error) {
      displayArea.value = "Error"; // Handle invalid expressions or errors
    }
  });
});
