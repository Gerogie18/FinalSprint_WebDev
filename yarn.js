// Function to describe brand, product line, and color of yarn
function describeBrandProductandColour(yarn) {
    return `$${yarn.brand} ${yarn.product_line}: <br/>${yarn.colorway}`;
}

// Function to describe care information
function describeCareInstructions(yarn) {
    if (yarn.care && yarn.care.machine_wash === "True") {
        return `<h3>Machine Washable</h3><p>Wash: ${yarn.care.wash}<br />Dry: ${yarn.care.dry}</p>`;
    } else {
        return `<h4>Hand Wash Only</h4><p>Wash: ${yarn.handwash}<br />Dry: ${yarn.dry}</p>`;
    }
}

// Function to extract and list all purchases
function listPurchases(yarn) {
    let purchaseRow = ''
    for (let i = 0; i < yarn.purchase.date.length; i++) {
        purchaseRow += `
            <tr>
                <td>${yarn.brand} ${yarn.product_line}: ${yarn.colorway}</td>
                <td>${yarn.purchase.date[i]}</td>
                <td>$${yarn.purchase.cost[i]}</td>
                <td>${yarn.purchase.quantity_grams[i]}g</td>
            </tr>
        `;
    }
    return purchaseRow;
}

fetch('yarn.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        const mainContainer = document.createElement('div'); // Create a new main container
        mainContainer.classList.add('main-container'); // Optionally add a class for styling

        const container = document.createElement('div');
        const tableContainer = document.createElement('div'); // Create a new div for the table

        // Initialize the table structure
        let purchases = `
            <div>
                <table>
                    <tr>
                        <th>Yarn</th>
                        <th>Date</th>
                        <th>Cost</th>
                        <th>Quantity (grams)</th>
                    </tr>`;

        for (const yarnName in data.yarn) {
            if (data.yarn.hasOwnProperty(yarnName)) {
                const yarn = data.yarn[yarnName];
                const brandProductandColour = `${yarn.brand} ${yarn['product-line']}: ${yarn.colorway}`;
                const careInstructions = describeCareInstructions(yarn);
                purchases += listPurchases(yarn); // Append each purchase list to the purchases string
                const yarnDescription = document.createElement('div');
                yarnDescription.classList.add('yarn');
                yarnDescription.innerHTML = `
                    <h2>${brandProductandColour}</h2>
                    <div class="care">${careInstructions}</div>
                `;
                container.appendChild(yarnDescription);
            }
        }

        purchases += '</table></div>'; // Close the table structure
        tableContainer.innerHTML = purchases; // Set the tableContainer's innerHTML to the complete table
        container.appendChild(tableContainer); // Append the table container to the main container

        mainContainer.appendChild(container); // Append the container to the main container
        document.body.appendChild(mainContainer); // Append the main container to the document body
        mainContainer.classList.add('mainContainer'); // Add a class to the main
    })
    .catch(error => {
        console.error('Error fetching data from yarn library json file', error);
    });


    