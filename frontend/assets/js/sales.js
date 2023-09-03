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


    // Fetch data from the API endpoint
    fetch('http://localhost/coffeeshop_management/backend/src/sales/display_sales.php')
    .then(response => response.json())
    .then(data => {
        // Calculate the most sold items (replace with your calculation logic)
        const mostSoldItemsData = calculateMostSoldItems(data);

        // Create the Highcharts donut chart
        Highcharts.chart('mostSoldItemsChart', {
            chart: {
                type: 'pie',
            },
            title: {
                text: 'Most Sold Items',
            },
            plotOptions: {
                pie: {
                    innerSize: '50%', // Create a donut chart by setting the innerSize
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y}',
                    },
                },
            },
            series: [{
                name: 'Quantity Sold',
                data: mostSoldItemsData,
            }],
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to calculate the most sold items
function calculateMostSoldItems(data) {
    // Replace this logic with your own calculation based on the sales data
    // For example, you can iterate through the data to count the quantity sold for each item
    // and then identify the items with the highest sales.

    // Sample calculation (replace with your own logic):
    const itemQuantityMap = new Map();
    data.forEach(item => {
        const itemName = item.item_name;
        const quantitySold = parseFloat(item.quantity);
        if (itemQuantityMap.has(itemName)) {
            itemQuantityMap.set(itemName, itemQuantityMap.get(itemName) + quantitySold);
        } else {
            itemQuantityMap.set(itemName, quantitySold);
        }
    });

    // Sort the items by quantity sold in descending order
    const sortedItems = [...itemQuantityMap.entries()].sort((a, b) => b[1] - a[1]);

    // Extract the top N most sold items (e.g., top 5 items)
    const topNItems = sortedItems.slice(0, 5);

    // Prepare data in the required format for the chart
    const mostSoldItemsData = topNItems.map(([itemName, quantitySold]) => ({
        name: itemName,
        y: quantitySold,
    }));

    return mostSoldItemsData;
}