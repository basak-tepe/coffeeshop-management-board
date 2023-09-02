// Fetch data from the API endpoint
fetch('http://localhost/coffeeshop_management/backend/src/inventory/display_inventory.php')
    .then(response => response.json())
    .then(data => {
        // Process and display the JSON data
        const inventory = document.getElementById('inventory');
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>ID:</strong> ${item.id}<br>
                <strong>FirstName:</strong> ${item.item_name}<br>
                <strong>LastName:</strong> ${item.category}<br>
                <strong>Email:</strong> ${item.quantity}<br>
                <strong>Phone:</strong> ${item.unit_of_measure}<br>
                <strong>Hired:</strong> ${item.purchase_price}<br>
                <strong>Position:</strong> $${item.expiration_date}<br><br>
            `;
            inventory.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
