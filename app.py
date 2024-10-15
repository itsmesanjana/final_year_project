# import re
# from flask import Flask, render_template, request, jsonify
# import sqlite3

# app = Flask(__name__)

# # Connect to SQLite database
# def get_db_connection():
#     conn = sqlite3.connect('database.db')
#     conn.row_factory = sqlite3.Row
#     return conn

# # Create the database if not exists
# def create_db():
#     conn = get_db_connection()
#     conn.execute('''
#         CREATE TABLE IF NOT EXISTS transactions (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             type TEXT,
#             category TEXT,
#             amount REAL,
#             date TEXT
#         )
#     ''')
#     conn.commit()
#     conn.close()
# # Updated function to calculate the balance
# # def calculate_balance():
# #     conn = get_db_connection()
# #     income = conn.execute('SELECT SUM(amount) as total FROM transactions WHERE type="income"').fetchone()['total'] or 0
# #     expense = conn.execute('SELECT SUM(amount) as total FROM transactions WHERE type="expense"').fetchone()['total'] or 0
# #     conn.close()
# #     balance = income - expense
# #     return balance
# # Parse voice command to add or remove transactions
# def parse_command(command):
#     pattern = r'(add|remove)\s+(income|expense)\s+of\s+\$?(\d+)\s+for\s+(.+)'
#     match = re.match(pattern, command.lower())

#     if match:
#         action = match.group(1)
#         transaction_type = match.group(2)
#         amount = match.group(3)
#         category = match.group(4)

#         # Predefined categories with strict matching
#         predefinedCategories = {
#     "salary": ["salary", "income"],
#     "business": ["business"],
#     "investment": ["investment"],
#     "extra income": ["extra income"],
#     "rental income": ["rental income"],
#     "freelance": ["freelance", "contract work"],
#     "groceries": ["groceries", "food"],
#     "shopping": ["shopping", "clothes", "mall"],
#     "housing_rent": ["housing", "rent"],
#     "utilities": ["utilities", "bills"],
#     "transportation": ["transportation", "bus", "train", "car", "travel"],
#     "entertainment": ["entertainment", "movies", "cinema", "film", "fun"],
#     "health": ["health", "medical", "doctor", "hospital"],
#     "insurance": ["insurance"],
#     "education": ["education", "school", "college", "tuition"],
#     "debt_repayment": ["debt", "loan", "repayment"],
#     "taxes": ["taxes"],
#     "gifts_donations": ["gifts", "donations"],
#     "subscriptions": ["subscriptions", "netflix", "streaming"],
#     "personal_care": ["personal care", "spa", "salon", "beauty"],
#     "miscellaneous": ["miscellaneous", "other"]
# };

#         # Strict matching of whole category or its alias
#         for key, aliases in predefinedCategories.items():
#             if category in aliases:
#                 category = key
#                 break
#         else:
#             category = 'user-defined'

#         return action, transaction_type, amount, category
#     else:
#         return None
# # Add transaction (for both manual and voice command inputs)
# # def add_transaction_to_db(transaction_type, category, amount, date):
# #     conn = get_db_connection()
# #     conn.execute(
# #         'INSERT INTO transactions (type, category, amount, date) VALUES (?, ?, ?, ?)',
# #         (transaction_type, category, amount, date)
# #     )
# #     conn.commit()
# #     conn.close()
    
# # Add transaction route (manual input)
# @app.route('/add_transaction', methods=['POST'])
# def add_transaction():
#     try:
#         data = request.json
#         transaction_type = data.get('transaction_type')
#         category = data.get('category')
#         amount = float(data.get('amount'))  # Ensure amount is a float
#         date = data.get('date')

#         # Check if the category is valid
#         if category not in predefinedCategories:
#             return jsonify({"error": "Invalid category"}), 400  # Return error for invalid category

#         # Proceed with adding the transaction if the category is valid
#         # Add your logic to save the transaction to the database here

#         return jsonify({"message": "Transaction added successfully!"}), 200

#     except ValueError:
#         return jsonify({"error": "Invalid amount"}), 400  # Handle invalid amount error
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500  # Log and return the error message
# # Voice command route
# # @app.route('/voice_command', methods=['POST'])
# # def voice_command():
# #     try:
# #         data = request.json
# #         command = data.get('command')
# #         date = data.get('date')  # Assuming the date comes from the client
        
# #         parsed = parse_command(command)
# #         if parsed:
# #             action, transaction_type, amount, category = parsed
            
# #             # Adding or removing income/expense based on the voice command
# #             if action == "add":
# #                 add_transaction_to_db(transaction_type, category, amount, date)
# #             elif action == "remove":
# #                 # For simplicity, we'll remove one matching transaction (advanced: implement a more detailed remove logic)
# #                 conn = get_db_connection()
# #                 conn.execute('DELETE FROM transactions WHERE type = ? AND category = ? AND amount = ? LIMIT 1',
# #                              (transaction_type, category, amount))
# #                 conn.commit()
#                 # conn.close()

#             # Calculate the current balance after the operation
#     #         balance = calculate_balance()

#     #         return jsonify({
#     #             "message": f"Transaction {action}ed successfully.",
#     #             "balance": balance
#     #         }), 200
#     #     else:
#     #         return jsonify({"error": "Invalid command format."}), 400

#     # except Exception as e:
#     #     return jsonify({"error": str(e)}), 500
    
# # Homepage
# @app.route('/')
# def index():
#     return render_template('index.html')
# # History Page
# @app.route('/history')
# def history():
#     conn = get_db_connection()
#     transactions = conn.execute('SELECT * FROM transactions').fetchall()
#     conn.close()
#     return render_template('history.html', transactions=transactions)

# # Delete transaction route..
# @app.route('/delete_transaction/<int:transaction_id>', methods=['DELETE'])
# def delete_transaction(transaction_id):
#     conn = get_db_connection()
#     conn.execute('DELETE FROM transactions WHERE id = ?', (transaction_id,))
#     conn.commit()
#     conn.close()
#     return jsonify({"message": "Transaction deleted successfully."})

# # Delete all transcations...
# @app.route('/delete_all_transactions', methods=['DELETE'])
# def delete_all_transactions():
#     conn = get_db_connection()
#     conn.execute('DELETE FROM transactions')
#     conn.commit()
#     conn.close()
#     return jsonify({"message": "All transactions deleted successfully."})

# # Chart Data API for Pie Chart
# @app.route('/get_chart_data')
# def get_chart_data():
#     conn = get_db_connection()
#     transactions = conn.execute('SELECT category, SUM(amount) as total FROM transactions WHERE type="expense" GROUP BY category').fetchall()
#     conn.close()

#     labels = [row['category'] for row in transactions]
#     values = [row['total'] for row in transactions]

#     return jsonify({'labels': labels, 'values': values})

# # Advice Generator
# @app.route('/get_advice')
# def get_advice():
#     conn = get_db_connection()
#     income = conn.execute('SELECT SUM(amount) as total FROM transactions WHERE type="income"').fetchone()['total'] or 0
#     expense = conn.execute('SELECT SUM(amount) as total FROM transactions WHERE type="expense"').fetchone()['total'] or 0
#     conn.close()

#     if income > expense:
#         advice = 'Good job! You are saving well. Keep up the good work.'
#     else:
#         advice = 'You are spending more than your income. Try to cut down on unnecessary expenses.'

#     return jsonify({'advice': advice})

# if __name__ == '__main__':
#     create_db()
#     app.run(debug=True)
import re
from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Connect to SQLite database
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Create the database if not exists
def create_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            category TEXT,
            amount REAL,
            date TEXT
        )
    ''')
    conn.commit()
    conn.close()

def parse_command(command):
    pattern = r'(add|remove)\s+(income|expense)\s+of\s+\$?(\d+)\s+for\s+(.+)'
    match = re.match(pattern, command.lower())

    if match:
        action = match.group(1)
        transaction_type = match.group(2)
        amount = match.group(3)
        category = match.group(4)

        # Predefined categories with strict matching
        predefinedCategories = {
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

        # Strict matching of whole category or its alias
        for key, aliases in predefinedCategories.items():
            if category in aliases:
                category = key
                break
        else:
            category = 'user-defined'

        return action, transaction_type, amount, category
    else:
        return None

# Add transaction route (manual input)
@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    try:
        data = request.json
        transaction_type = data.get('transaction_type')
        category = data.get('category')
        amount = float(data.get('amount'))  # Ensure amount is a float
        date = data.get('date')

        # Check if the category is valid
        if category not in predefinedCategories:
            return jsonify({"error": "Invalid category"}), 400  # Return error for invalid category

        # Proceed with adding the transaction if the category is valid
        # Add your logic to save the transaction to the database here

        return jsonify({"message": "Transaction added successfully!"}), 200

    except ValueError:
        return jsonify({"error": "Invalid amount"}), 400  # Handle invalid amount error
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Log and return the error message

# Homepage
@app.route('/')
def index():
    return render_template('index.html')
# History Page
@app.route('/history')
def history():
    conn = get_db_connection()
    transactions = conn.execute('SELECT * FROM transactions').fetchall()
    conn.close()
    return render_template('history.html', transactions=transactions)

# Delete transaction route..
@app.route('/delete_transaction/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM transactions WHERE id = ?', (transaction_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Transaction deleted successfully."})

# Delete all transcations...
@app.route('/delete_all_transactions', methods=['DELETE'])
def delete_all_transactions():
    conn = get_db_connection()
    conn.execute('DELETE FROM transactions')
    conn.commit()
    conn.close()
    return jsonify({"message": "All transactions deleted successfully."})

# Chart Data API for Pie Chart
@app.route('/get_chart_data')
def get_chart_data():
    conn = get_db_connection()
    transactions = conn.execute('SELECT category, SUM(amount) as total FROM transactions WHERE type="expense" GROUP BY category').fetchall()
    conn.close()

    labels = [row['category'] for row in transactions]
    values = [row['total'] for row in transactions]

    return jsonify({'labels': labels, 'values': values})

# Advice Generator
@app.route('/get_advice')
def get_advice():
    conn = get_db_connection()
    income = conn.execute('SELECT SUM(amount) as total FROM transactions WHERE type="income"').fetchone()['total'] or 0
    expense = conn.execute('SELECT SUM(amount) as total FROM transactions WHERE type="expense"').fetchone()['total'] or 0
    conn.close()

    if income > expense:
        advice = 'Good job! You are saving well. Keep up the good work.'
    else:
        advice = 'You are spending more than your income. Try to cut down on unnecessary expenses.'

    return jsonify({'advice': advice})

if __name__ == '__main__':
    create_db()
    app.run(debug=True)
