// Fetch data from the API endpoint
fetch('http://localhost/coffeeshop_management/backend/src/menu/display_menu.php')
    .then(response => response.json())
    .then(data => {
        // Process and display the JSON data
        const menuList = document.getElementById('menuList');
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>ID:</strong> ${item.id}<br>
                <strong>Name:</strong> ${item.name}<br>
                <strong>Description:</strong> ${item.description}<br>
                <strong>Price:</strong> $${item.price}<br><br>
            `;
            menuList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
