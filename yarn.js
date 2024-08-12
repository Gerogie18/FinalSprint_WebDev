// Function to describe brand, product line, and color of yarn
function describeBrandProductandColour(yarn) {
    return `${yarn.brand} ${yarn['product-line']}: ${yarn.colorway}`;
}

// Function to describe care information
function describeCareInstructions(yarn) {
    if (yarn.care && yarn.care.machine_wash === "True") {
        return `<h3>Machine Washable</h3><p>Wash: ${yarn.care.wash} Dry: ${yarn.care.dry}</p>`;
    } else {
        return `<h4>Hand Wash Only</h4><p>Wash: ${yarn.handwash} Dry: ${yarn.dry}</p>`;
    }
}

// Function to extract and list all purchases
function listPurchases(yarn) {
    let purchaseRow = ''
    for (let i = 0; i < yarn.purchase.date.length; i++) {
        purchaseRow += `
            <tr>
                <td>${yarn.brand}</td>
                <td>${yarn['product-line']}</td>
                <td>${yarn.colorway}</td>
                <td>${yarn.purchase.date[i]}</td>
                <td>$${yarn.purchase.cost[i]}</td>
                <td>${yarn.purchase.quantity_grams[i]}g</td>
            </tr>
        `;
    }
    return purchaseRow;
}

let purchases = `
        <div>
            <table>
                <tr>
                    <th>Yarn</th>
                    <th>Date</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                </tr>`;

fetch('yarn.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const container = document.createElement('div');
        const tableContainer = document.createElement('div'); // Create a new div for the table

        for (const yarnName in data.yarn) {
            if (data.yarn.hasOwnProperty(yarnName)) {
                const yarn = data.yarn[yarnName];
                const brandProductandColour = `${yarn.brand} ${yarn['product-line']}: ${yarn.colorway}`;
                const careInstructions = describeCareInstructions(yarn);
                purchases += listPurchases(yarn);
                const yarnDescription = document.createElement('div');
                yarnDescription.innerHTML = `
                    <h2>${brandProductandColour}</h2>
                    <div>${careInstructions}</div>
                `;
                container.appendChild(yarnDescription);
                tableContainer.innerHTML += purchases; // Append each purchase list to the table container
            }
        }
purchases += '</table> </div>';
        container.appendChild(tableContainer); // Append the table container to the main container
        document.body.appendChild(container);
    })
    .catch(error => {
        console.error('Error fetching data from yarn library json file', error);
    });


    