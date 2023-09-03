$(document).ready(function () {
    // Function to create a new empty row for adding a menu item
    // Function to create a new empty row for adding a menu item
    function createEmptyRow() {
        const newRow = $('<tr></tr>');
        newRow.html(`
            <td></td>
            <td><input type="text" placeholder="Enter name"></td>
            <td><input type="text" placeholder="Enter description"></td>
            <td><input type="text" placeholder="Enter price"></td>
            <td>
                <button class="ui icon button add-button green">
                    <i class="plus icon"></i>
                </button>
            </td>
        `);
        return newRow;
    }

    // Function to fetch and render menu items
    async function fetchAndRenderMenuItems() {
        // Fetch data from the API endpoint
        $.get('http://localhost/coffeeshop_management/backend/src/menu/display_menu.php', function (data) {
            // Clear existing rows in the table
            const menuList = $('#menuList');
            menuList.find('tr:gt(0)').remove();

            $.each(data, function (index, item) {
                const row = $('<tr></tr>');
                row.html(`
                    <td>${item.id}</td>
                    <td><input type="text" value="${item.name}" readonly class="display-area"></td>
                    <td><input type="text" value="${item.description}" readonly class="display-area"></td>
                    <td><input type="text" value="$${item.price}" readonly  class="display-area"></td>
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
                menuList.append(row);
            });
        }).fail(function (error) {
            console.error('Error fetching data:', error);
        });
    }


    // Fetch data from the API endpoint
    $.get('http://localhost/coffeeshop_management/backend/src/menu/display_menu.php', function (data) {
        // Process and display the JSON data
        const menuList = $('#menuList');
        const emptyrow = createEmptyRow();
        menuList.prepend(emptyrow);

        $.each(data, function (index, item) {
            const row = $('<tr></tr>');
            row.html(`
                <td>${item.id}</td>
                <td><input type="text" value="${item.name}" readonly class="display-area"></td>
                <td><input type="text" value="${item.description}" readonly class="display-area"></td>
                <td><input type="text" value="$${item.price}" readonly  class="display-area"></td>
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
            menuList.append(row);

            const editButton = row.find('.edit-button');
            const saveButton = row.find('.save-button');
            const deleteButton = row.find('.delete-button');
            const inputFields = row.find('input[type="text"]');

            /// Handle the addition of new items
            emptyrow.find('.add-button').unbind('click').click(async function () {
                fetchAndRenderMenuItems();
                const newItemData = {
                    name: emptyrow.find('input:eq(0)').val(),
                    description: emptyrow.find('input:eq(1)').val(),
                    price: emptyrow.find('input:eq(2)').val().replace('$', ''),
                };

                //clear the input fields
                emptyrow.find('input').val('');
                // Send a POST request to create_menu.php to add the new item
                $.ajax({
                    url: 'http://localhost/coffeeshop_management/backend/src/menu/create_menu.php',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(newItemData),
                    success: function (response) {
                        // Data successfully added
                        console.log('Data added successfully.');

                        // Update the ID field of the new row with the response from the server
                        const newId = response.id;
                        row.find('td:first').text(newId);

                        // Toggle the readonly attribute of input fields
                        inputFields.prop('readonly', true);
                    },
                    error: function () {
                        // Handle errors here if needed
                        console.error('Failed to add data.');
                    },
                });
                fetchAndRenderMenuItems();
            });


            //UPDATE
            row.find(".edit-button").click(function () {
                console.log('clicked update');

                // Toggle the readonly attribute of input fields
                inputFields.prop('readonly', function (i, value) {
                    return !value;
                });

                // Toggle the display of edit, save, and delete buttons
                editButton.hide();
                saveButton.show();
                deleteButton.show();
            });

            //DELETE
            row.find(".delete-button").click(function () {
                console.log('clicked delete');
                // Send a DELETE request to delete_menu.php to delete the item from the database
                $.ajax({
                    url: 'http://localhost/coffeeshop_management/backend/src/menu/delete_menu.php',
                    type: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify({ id: parseInt(item.id) }),
                    success: function () {
                        // Data successfully deleted
                        console.log('Data deleted successfully.');
                    },
                    error: function () {
                        // Handle errors here if needed
                        console.error('Failed to delete data.');
                    },
                });
                // Toggle the display of edit, save, and delete buttons
                editButton.show();
                saveButton.hide();
                deleteButton.hide();
                fetchAndRenderMenuItems();
            });


            saveButton.unbind('click').click(function () {
                console.log('clicked save');
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
