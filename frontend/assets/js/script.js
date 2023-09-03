fetch('http://localhost/coffeeshop_management/backend/src/sales/display_sales.php')
    .then(response => response.json())
    .then(data => {
        // Extract relevant data for the chart (e.g., sale_date and total_price)
        const chartData = data.map(item => ({
            date: item.sale_date,
            totalSales: parseFloat(item.total_price), // Assuming total_price is a numeric value
        }));

        // Sort the data by date if needed
        chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Create an array of dates and an array of total sales
        const dates = chartData.map(item => item.date);
        const totalSales = chartData.map(item => item.totalSales);

        // Create a Highcharts chart to visualize total sales over time
        Highcharts.chart('salesChart', {
            chart: {
                type: 'line',
            },
            title: {
                text: 'Total Sales Over Time',
            },
            xAxis: {
                categories: dates,
            },
            yAxis: {
                title: {
                    text: 'Total Sales Amount',
                },
            },
            series: [{
                name: 'Total Sales',
                data: totalSales,
            }],
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


// Function to fetch inventory data and create the bar chart

fetch('http://localhost/coffeeshop_management/backend/src/inventory/display_inventory.php')
    .then(response => response.json())
    .then(data => {
        // Extract relevant data for the chart (e.g., item_name and quantity)
        const chartData = data.map(item => ({
            name: item.item_name,
            quantity: parseInt(item.quantity), // Assuming quantity is numeric
        }));

        // Create the Highcharts bar chart
        Highcharts.chart('inventoryChart', {
            chart: {
                type: 'bar',
            },
            title: {
                text: 'Inventory Quantity by Item',
            },
            xAxis: {
                categories: chartData.map(item => item.name),
                title: {
                    text: 'Item Name',
                },
            },
            yAxis: {
                title: {
                    text: 'Quantity',
                },
            },
            series: [{
                name: 'Quantity',
                data: chartData.map(item => item.quantity),
            }],
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Fetch data from the provided PHP script
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

fetch('http://localhost/coffeeshop_management/backend/src/sales/display_sales.php')
    .then(response => response.json())
    .then(data => {
        // Extract sale hours and count sales for each hour
        const salesByHour = {};
        data.forEach(item => {
            const hour = item.sale_hour;
            if (salesByHour[hour]) {
                salesByHour[hour]++;
            } else {
                salesByHour[hour] = 1;
            }
        });

        // Prepare data for the radar chart
        const radarData = Object.entries(salesByHour).map(([hour, sales]) => ({
            hour: hour,
            sales: sales,
        }));

        // Create the Highcharts radar chart
        Highcharts.chart('salesByHourChart', {
            chart: {
                polar: true,
            },
            title: {
                text: 'Sales by Hour',
            },
            xAxis: {
                categories: radarData.map(item => item.hour),
            },
            yAxis: {
                title: {
                    text: 'Number of Sales',
                },
            },
            series: [{
                name: 'Sales',
                data: radarData.map(item => item.sales),
                pointPlacement: 'on',
            }],
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function showOverviewCharts() {
    const tabs = document.querySelectorAll('.item');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Add the "active" class to the clicked tab
    const overviewTab = document.querySelector('#overviewTab');
    overviewTab.classList.add('active');


    // Toggle the visibility of the container div
    var container = document.getElementById('overviewCharts');
    var menu = document.getElementById('menuContent');
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block'; // Show the container
        menu.style.display = 'none';
    } else {
        container.style.display = 'none'; // Hide the container
    }
}

function showMenuContent() {

    const tabs = document.querySelectorAll('.item');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });


    // Add the "active" class to the clicked tab
    const menuTab = document.querySelector('#menuTab');
    menuTab.classList.add('active');

    // Toggle the visibility of the container div

    var charts = document.getElementById('overviewCharts');
    var container = document.getElementById('menuContent');
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block'; // Show the container
        charts.style.display = 'none';
    } else {
        container.style.display = 'none'; // Hide the container
    }
}