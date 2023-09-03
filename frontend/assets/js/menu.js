// Fetch data from the API endpoint
fetch('http://localhost/coffeeshop_management/backend/src/menu/display_menu.php')
    .then(response => response.json())
    .then(data => {
        // Process and display the JSON data
        const menuTableBody = document.getElementById('menuList');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>$${item.price}</td>
            `;
            menuTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
