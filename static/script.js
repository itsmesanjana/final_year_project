// // Predefined categories with their synonyms
// const predefinedCategories = {
//     "salary": ["salary", "income"],
//     "business": ["business"],
//     "investment": ["investment"],
//     "extra income": ["extra income"],
//     "rental income": ["rental income"],
//     "freelance": ["freelance", "contract work"],
//     "groceries": ["groceries", "food"],
//     "shopping": ["shopping", "clothes", "mall"],
//     "housing_rent": ["housing", "rent"],
//     "utilities": ["utilities", "bills"],
//     "transportation": ["transportation", "bus", "train", "car", "travel"],
//     "entertainment": ["entertainment", "movies", "cinema", "film", "fun"],
//     "health": ["health", "medical", "doctor", "hospital"],
//     "insurance": ["insurance"],
//     "education": ["education", "school", "college", "tuition"],
//     "debt_repayment": ["debt", "loan", "repayment"],
//     "taxes": ["taxes"],
//     "gifts_donations": ["gifts", "donations"],
//     "subscriptions": ["subscriptions", "netflix", "streaming"],
//     "personal_care": ["personal care", "spa", "salon", "beauty"],
//     "miscellaneous": ["miscellaneous", "other"]
// };

// // Function to handle voice input
// function processVoiceInput(voiceCommand) {
//     console.log("Voice Command Received: ", voiceCommand);  // Log the raw voice command

//     const transactionType = getTransactionTypeFromVoice(voiceCommand);
//     const amount = getAmountFromVoice(voiceCommand);
//     const date = getDateFromVoice(voiceCommand);
//     const category = getCategoryFromVoice(voiceCommand);  // Updated category logic

//     console.log("Recognized Category: ", category);  // Log the recognized category

//     if (amount && category && date) {
//         const data = {
//             type: transactionType,
//             category: category,
//             amount: amount,
//             date: date
//         };

//         // Send data to backend for processing (optional)
//         fetch('/add_transaction', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(result => alert(result.message))
//         .catch(error => alert('Error adding transaction'));

//         // Update the transaction list visually
//         updateTransactionList(data);
//     } else {
//         alert('Please make sure all fields are recognized from the voice input.');
//     }
// }

// // Function to extract the category from the voice command using regular expressions
// function getCategoryFromVoice(voiceCommand) {
//     let recognizedCategory = null;

//     // Normalize the spoken command to lowercase
//     const spokenWords = voiceCommand.toLowerCase();
//     console.log("Spoken Command: ", spokenWords);  // Log the entire spoken sentence

//     // Iterate through the predefined categories and their synonyms
//     for (const [category, synonyms] of Object.entries(predefinedCategories)) {
//         synonyms.forEach(synonym => {
//             // Check if the synonym is found within the spoken command
//             const regex = new RegExp(`\\b${synonym}\\b`, 'i');  // Ensure it matches whole words
//             if (regex.test(spokenWords)) {
//                 recognizedCategory = category;
//                 console.log(`Matched Category: ${category} (synonym: ${synonym})`);
//             }
//         });
//     }

//     // If no match found, treat the entire input as a custom category
//     if (!recognizedCategory) {
//         recognizedCategory = voiceCommand.trim();
//         console.log("Custom Category (No match found): ", recognizedCategory);
//     }

//     return recognizedCategory;
// }

// // Function to update the transaction list visually
// function updateTransactionList(transaction) {
//     const transactionList = document.getElementById('transactionList');
//     const listItem = document.createElement('li');
//     listItem.textContent = `${transaction.date} - ${transaction.type} - $${transaction.amount} for ${transaction.category}`;
//     transactionList.appendChild(listItem);
// }


// // Voice recognition
// const voiceButton = document.getElementById('voiceCommand');
// voiceButton.addEventListener('click', function() {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;

//     recognition.onresult = function(event) {
//         const command = event.results[0][0].transcript.toLowerCase();
//         alert(`Voice Command Received: ${command}`);

//         let transactionType, category, amount;

//         // Example categories - these should match the options in the category select field
//         const categories = ["salary", "business", "investment", "extra income", "rental income", "freelance",
//     "groceries", "shopping", "housing_rent", "utilities", "transportation", 
//     "entertainment", "health", "insurance", "education", "debt_repayment", 
//     "taxes", "gifts_donations", "subscriptions", "personal_care", "miscellaneous"];
//     // const categories = Object.keys(predefinedCategories);
//         // Extract transaction type, amount, and category from voice command
//         if (command.includes('add expense')) {
//             transactionType = 'expense';
//             amount = parseFloat(command.match(/\d+/)); // Extracts amount
//         } else if (command.includes('add income')) {
//             transactionType = 'income';
//             amount = parseFloat(command.match(/\d+/)); // Extracts amount
//         }

//         // Check if the command contains one of the categories
//         // category = categories.find(cat => command.includes(cat));
//         category = getCategoryFromVoice(command);
//         // If no predefined category was matched, assume it's a user-defined category
//         if (!category) {
//             category = 'user-defined'; // Let the user define this in the app later
//         }

//         if (amount && transactionType && category) {
//             const data = {
//                 type: transactionType,
//                 category: category,
//                 amount: amount,
//                 date: new Date().toISOString().split('T')[0] // Current date
//             };

//             // Send data to backend for processing
//             fetch('/add_transaction', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data)
//             })
//             .then(response => response.json())
//             .then(result => alert(result.message))
//             .catch(error => alert('Error adding transaction'));

//             // Update the list visually
//             updateTransactionList(data);
//         } else {
//             alert('Sorry, I could not understand the command.');
//         }
//     };

//     recognition.start();
// });


// function processVoiceCommand(command) {
//     fetch('/process_voice_command', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ command: command })
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert(data.message);  // Show the message returned from the server
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }
 
// document.addEventListener('DOMContentLoaded', function () {
//     // Get all delete buttons
//     const deleteButtons = document.querySelectorAll('.delete-transaction');

//     // Attach a click event listener to each delete button
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const transactionId = this.getAttribute('data-id'); // Get the transaction ID from the button

//             // Confirm deletion
//             if (confirm('Are you sure you want to delete this transaction?')) {
//                 // Send a DELETE request to the server
//                 fetch(`/delete_transaction/${transactionId}`, {
//                     method: 'DELETE',
//                 })
//                 .then(response => {
//                     if (response.ok) {
//                         // If successful, remove the transaction from the DOM
//                         const row = document.getElementById(`transaction-${transactionId}`);
//                         row.remove(); // Remove the corresponding row from the table
//                     } else {
//                         alert('Error: Could not delete the transaction.');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                     alert('Error: Could not delete the transaction.');
//                 });
//             }
//         });
//     });
// });

// document.getElementById('category').addEventListener('change', function() {
//     const customCategoryInput = document.getElementById('custom_category');
//     if (this.value === 'Other') {
//         customCategoryInput.style.display = 'block';  // Show input field
//     } else {
//         customCategoryInput.style.display = 'none';   // Hide input field
//     }
// });

// function loadPieChart() {
//     fetch('/get_chart_data')
//         .then(response => response.json())
//         .then(data => {
//             const ctx = document.getElementById('expenseChart').getContext('2d');
//             new Chart(ctx, {
//                 type: 'pie',
//                 data: {
//                     labels: data.labels,
//                     datasets: [{
//                         label: 'Expenses',
//                         data: data.values,
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)',
//                             'rgba(54, 162, 235, 0.2)',
//                             'rgba(255, 206, 86, 0.2)',
//                             'rgba(75, 192, 192, 0.2)',
//                             'rgba(153, 102, 255, 0.2)',
//                             'rgba(255, 159, 64, 0.2)'
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(153, 102, 255, 1)',
//                             'rgba(255, 159, 64, 1)'
//                         ],
//                         borderWidth: 1
//                     }]
//                 },
                
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(context) {
//                                     const label = context.label || '';
//                                     const value = context.raw || 0;
//                                     return `${label}: $${value.toFixed(2)}`;
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         })
//         .catch(error => {
//             console.error('Error loading chart data:', error);
//             alert('Could not load chart data');
//         });
// }

// // Function to load the chart on page load
// document.addEventListener('DOMContentLoaded', function() {
//     loadPieChart();
// });

// // // Helper functions for extracting transaction details from the voice command

// // function getTransactionTypeFromVoice(voiceCommand) {
// //     if (voiceCommand.includes('expense')) {
// //         return 'expense';
// //     } else if (voiceCommand.includes('income')) {
// //         return 'income';
// //     } else {
// //         return null;
// //     }
// // }

// // function getAmountFromVoice(voiceCommand) {
// //     const match = voiceCommand.match(/\b\d+(\.\d+)?\b/); // Find any number in the command
// //     return match ? parseFloat(match[0]) : null;
// // }

// // function getDateFromVoice(voiceCommand) {
// //     const dateRegex = /\b(\d{4}-\d{2}-\d{2})\b/; // Match YYYY-MM-DD format
// //     const match = voiceCommand.match(dateRegex);
// //     if (match) {
// //         return match[0];
// //     } else {
// //         // If no date is found in the command, use the current date
// //         return new Date().toISOString().split('T')[0]; // Returns current date in YYYY-MM-DD
// //     }
// // }

// // // Event listener to initialize voice recognition
// // document.getElementById('voiceCommand').addEventListener('click', function() {
// //     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
// //     recognition.lang = 'en-US';
// //     recognition.interimResults = false;

// //     recognition.onresult = function(event) {
// //         const voiceCommand = event.results[0][0].transcript.toLowerCase();
// //         processVoiceInput(voiceCommand);
// //     };

// //     recognition.start();
// // });

           
// // document.getElementById('createTransaction').addEventListener('click', function() {
// //     const transactionType = document.getElementById('transactionType').value;
// //     const category = document.getElementById('category').value === 'custom' 
// //                      ? document.getElementById('customCategory').value 
// //                      : document.getElementById('category').value;
// //     const amount = document.getElementById('amount').value;
// //     const date = document.getElementById('date').value;

// //     // Validate fields
// //     if (!amount || !date || !category) {
// //         alert("Please fill in all the fields.");
// //         return;
// //     }

// //     // Create transaction item
// //     const transactionList = document.getElementById('transactionList');
// //     const newTransaction = document.createElement('li');
    
// //     // Use + for Income and - for Expense
// //     const sign = transactionType === 'income' ? '+' : '-';
// //     newTransaction.textContent = `${sign} ${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} | ${category} | ${amount} | ${date}`;

// //     // Append to the list
// //     transactionList.appendChild(newTransaction);

// //     // Clear input fields after submission
// //     document.getElementById('amount').value = '';
// //     document.getElementById('date').value = '';
// //     if (document.getElementById('customCategoryGroup').style.display === 'block') {
// //         document.getElementById('customCategory').value = '';
// //     }
// // });



script.js // Predefined categories with their synonyms
const predefinedCategories = {
    "salary": ["salary", "income"],
    "business": ["business"],
    "investment": ["investment"],
    "extra income": ["extra income"],
    "rental income": ["rental income"],
    "freelance": ["freelance", "contract work"],
    "groceries": ["groceries", "food"],
    "shopping": ["shopping", "clothes", "mall"],
    "housing_rent": ["housing", "rent"],
    "utilities": ["utilities", "bills"],
    "transportation": ["transportation", "bus", "train", "car", "travel"],
    "entertainment": ["entertainment", "movies", "cinema", "film", "fun"],
    "health": ["health", "medical", "doctor", "hospital"],
    "insurance": ["insurance"],
    "education": ["education", "school", "college", "tuition"],
    "debt_repayment": ["debt", "loan", "repayment"],
    "taxes": ["taxes"],
    "gifts_donations": ["gifts", "donations"],
    "subscriptions": ["subscriptions", "netflix", "streaming"],
    "personal_care": ["personal care", "spa", "salon", "beauty"],
    "miscellaneous": ["miscellaneous", "other"]
};

// Function to handle voice input
function processVoiceInput(voiceCommand) {
    console.log("Voice Command Received: ", voiceCommand);  // Log the raw voice command

    const transactionType = getTransactionTypeFromVoice(voiceCommand);
    const amount = getAmountFromVoice(voiceCommand);
    const date = getDateFromVoice(voiceCommand);
    const category = getCategoryFromVoice(voiceCommand);  // Updated category logic

    console.log("Recognized Category: ", category);  // Log the recognized category

    if (amount && category && date) {
        const data = {
            type: transactionType,
            category: category,
            amount: amount,
            date: date
        };

        // Send data to backend for processing (optional)
        fetch('/add_transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => alert(result.message))
        .catch(error => alert('Error adding transaction'));

        // Update the transaction list visually
        updateTransactionList(data);
    } else {
        alert('Please make sure all fields are recognized from the voice input.');
    }
}

// Function to extract the category from the voice command using regular expressions
function getCategoryFromVoice(voiceCommand) {
    let recognizedCategory = null;

    // Normalize the spoken command to lowercase
    const spokenWords = voiceCommand.toLowerCase();
    console.log("Spoken Command: ", spokenWords);  // Log the entire spoken sentence

    // Iterate through the predefined categories and their synonyms
    for (const [category, synonyms] of Object.entries(predefinedCategories)) {
        synonyms.forEach(synonym => {
            // Check if the synonym is found within the spoken command
            const regex = new RegExp(`\\b${synonym}\\b`, 'i');  // Ensure it matches whole words
            if (regex.test(spokenWords)) {
                recognizedCategory = category;
                console.log(`Matched Category: ${category} (synonym: ${synonym})`);
            }
        });
    }

    // If no match found, treat the entire input as a custom category
    if (!recognizedCategory) {
        recognizedCategory = voiceCommand.trim();
        console.log("Custom Category (No match found): ", recognizedCategory);
    }

    return recognizedCategory;
}

// Function to update the transaction list visually
function updateTransactionList(transaction) {
    const transactionList = document.getElementById('transactionList');
    const listItem = document.createElement('li');
    listItem.textContent = `${transaction.date} - ${transaction.type} - $${transaction.amount} for ${transaction.category}`;
    transactionList.appendChild(listItem);
}


// Voice recognition
const voiceButton = document.getElementById('voiceCommand');
voiceButton.addEventListener('click', function() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        alert(`Voice Command Received: ${command}`);

        let transactionType, category, amount;

        // Example categories - these should match the options in the category select field
        const categories = ["salary", "business", "investment", "extra income", "rental income", "freelance",
    "groceries", "shopping", "housing_rent", "utilities", "transportation", 
    "entertainment", "health", "insurance", "education", "debt_repayment", 
    "taxes", "gifts_donations", "subscriptions", "personal_care", "miscellaneous"];

        // Extract transaction type, amount, and category from voice command
        if (command.includes('add expense')) {
            transactionType = 'expense';
            amount = parseFloat(command.match(/\d+/)); // Extracts amount
        } else if (command.includes('add income')) {
            transactionType = 'income';
            amount = parseFloat(command.match(/\d+/)); // Extracts amount
        }

        // Check if the command contains one of the categories
        category = categories.find(cat => command.includes(cat));

        // If no predefined category was matched, assume it's a user-defined category
        if (!category) {
            category = 'user-defined'; // Let the user define this in the app later
        }

        if (amount && transactionType && category) {
            const data = {
                type: transactionType,
                category: category,
                amount: amount,
                date: new Date().toISOString().split('T')[0] // Current date
            };

            // Send data to backend for processing
            fetch('/add_transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => alert(result.message))
            .catch(error => alert('Error adding transaction'));

            // Update the list visually
            updateTransactionList(data);
        } else {
            alert('Sorry, I could not understand the command.');
        }
    };

    recognition.start();
});


function processVoiceCommand(command) {
    fetch('/process_voice_command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: command })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  // Show the message returned from the server
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
 
document.addEventListener('DOMContentLoaded', function () {
    // Get all delete buttons
    const deleteButtons = document.querySelectorAll('.delete-transaction');

    // Attach a click event listener to each delete button
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const transactionId = this.getAttribute('data-id'); // Get the transaction ID from the button

            // Confirm deletion
            if (confirm('Are you sure you want to delete this transaction?')) {
                // Send a DELETE request to the server
                fetch(`/delete_transaction/${transactionId}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        // If successful, remove the transaction from the DOM
                        const row = document.getElementById(`transaction-${transactionId}`);
                        row.remove(); // Remove the corresponding row from the table
                    } else {
                        alert('Error: Could not delete the transaction.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error: Could not delete the transaction.');
                });
            }
        });
    });
});

document.getElementById('category').addEventListener('change', function() {
    const customCategoryInput = document.getElementById('custom_category');
    if (this.value === 'Other') {
        customCategoryInput.style.display = 'block';  // Show input field
    } else {
        customCategoryInput.style.display = 'none';   // Hide input field
    }
});

function loadPieChart() {
    fetch('/get_chart_data')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('expenseChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Expenses',
                        data: data.values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            });
        });
}

document.addEventListener('DOMContentLoaded', loadPieChart);

