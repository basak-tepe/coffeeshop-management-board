$(document).ready(function () {
    // Fetch data from the API endpoint
    $.get('http://localhost/coffeeshop_management/backend/src/menu/display_menu.php', function (data) {
        // Process and display the JSON data
        const menuTableBody = $('#menuList');
        $.each(data, function (index, item) {
            const row = $('<tr></tr>');
            row.html(`
                <td>${item.id}</td>
                <td><input type="text" value="${item.name}" readonly></td>
                <td><input type="text" value="${item.description}" readonly></td>
                <td><input type="text" value="$${item.price}" readonly></td>
                <td>
                    <button class="ui icon button edit-button blue">
                        <i class="pencil icon"></i>
                    </button>
                    <button class="ui icon button save-button purple" style="display: none;">
                        <i class="save icon"></i>
                    </button>
                    <button class="ui icon button delete-button red" style="display: none;">
                        <i class="trash icon"></i>
                    </button>
                </td>
            `);
            menuTableBody.append(row);

            const editButton = row.find('.edit-button');
            const saveButton = row.find('.save-button');
            const deleteButton = row.find('.delete-button');
            const inputFields = row.find('input[type="text"]');

            editButton.click(function () {
                // Toggle the readonly attribute of input fields
                inputFields.prop('readonly', function (i, value) {
                    return !value;
                });

                // Toggle the display of edit, save, and delete buttons
                editButton.hide();
                saveButton.show();
                deleteButton.show();
            });

            saveButton.click(function () {
                // Extract updated data from input fields
                const updatedData = {
                    id: item.id,
                    name: inputFields.eq(0).val(),
                    description: inputFields.eq(1).val(),
                    price: inputFields.eq(2).val().replace('$', ''), // Remove "$" before sending to the backend
                };

                // Send a POST request to edit_menu.php to update the item in the database
                $.ajax({
                    url: 'http://localhost/coffeeshop_management/backend/src/menu/edit_menu.php',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(updatedData),
                    success: function () {
                        // Data successfully updated
                        console.log('Data updated successfully.');

                        // Toggle the readonly attribute of input fields
                        inputFields.prop('readonly', true);


                    },
                    error: function () {
                        // Handle errors here if needed
                        console.error('Failed to update data.');
                    },
                });

                    // Toggle the display of edit, save, and delete buttons
                    editButton.show();
                    saveButton.hide();
                    deleteButton.hide();
            });
        });
    }).fail(function (error) {
        console.error('Error fetching data:', error);
    });
});
