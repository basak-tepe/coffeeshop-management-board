// Fetch data from the API endpoint
fetch('http://localhost/coffeeshop_management/backend/src/sales/display_sales.php')
    .then(response => response.json())
    .then(data => {
        // Process and display the JSON data
        const sales = document.getElementById('sales');
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>ID:</strong> ${item.id}<br>
                <strong>Name:</strong> ${item.sale_date}<br>
                <strong>Description:</strong> ${item.item_name}<br>
                <strong>Price:</strong> $${item.quantity}<br>
                <strong>Price:</strong> $${item.unit_price}<br>
                <strong>Price:</strong> $${item.total_price}<br>
                <strong>Price:</strong> $${item.payment_method}<br><br>
            `;
            sales.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
