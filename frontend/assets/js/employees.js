// Fetch data from the API endpoint
fetch('http://localhost/coffeeshop_management/backend/src/employees/display_employees.php')
    .then(response => response.json())
    .then(data => {
        // Process and display the JSON data
        const employees = document.getElementById('employees');
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>ID:</strong> ${item.id}<br>
                <strong>FirstName:</strong> ${item.first_name}<br>
                <strong>LastName:</strong> ${item.last_name}<br>
                <strong>Email:</strong> ${item.email}<br>
                <strong>Phone:</strong> ${item.phone_number}<br>
                <strong>Hired:</strong> ${item.hire_date}<br>
                <strong>Position:</strong> $${item.POSITION}<br>
                <strong>Hourly Wage:</strong> $${item.hourly_wage}<br><br>
            `;
            employees.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
