from flask import Flask, jsonify, request, send_from_directory, session
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User  # Assuming 'User' model is defined in 'models.py'

app = Flask(__name__)
app.config['SECRET_KEY'] = 'cairocoders-ednalan'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)

# Create all tables if they do not exist
with app.app_context():
    db.create_all()

# Dummy data for properties (replace with your actual data storage logic)
properties = [
    {'id': 1, 'name': 'Property 1', 'location': 'MOMBASA', 'imageUrl': 'Property1.jpeg', 'price': 250000},
    {'id': 2, 'name': 'Property 2', 'location': 'City B', 'imageUrl': 'Property2.jpg', 'price': 350000},
    {'id': 3, 'name': 'Property 3', 'location': 'KAREN, NAIROBI', 'imageUrl': 'Property3.jpg', 'price': 450000},
    {'id': 4, 'name': 'Property 4', 'location': 'City D', 'imageUrl': 'Property4.jpg', 'price': 550000},
    {'id': 5, 'name': 'Property 5', 'location': 'City E', 'imageUrl': 'Property5.jpg', 'price': 650000},
    {'id': 6, 'name': 'Property 6', 'location': 'KONZA CITY', 'imageUrl': 'Property6.jpg', 'price': 750000},
]

# Serve images from 'images' folder in the project root
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('images', filename)

# Endpoint to register a new user
@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

# Endpoint to log in a user
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

# Endpoint to retrieve all properties
@app.route('/properties', methods=['GET'])
def get_properties():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 1000))
    start = (page - 1) * per_page
    end = start + per_page
    return jsonify(properties[start:end])

# Endpoint to retrieve a specific property by ID
@app.route('/properties/<int:id>', methods=['GET'])
def get_property(id):
    property = next((prop for prop in properties if prop['id'] == id), None)
    if property:
        return jsonify(property)
    else:
        return jsonify({'error': 'Property not found'}), 404

# Endpoint to create a new property
@app.route('/properties', methods=['POST'])
def create_property():
    new_property = request.json
    if 'id' not in new_property:
        return jsonify({'error': 'ID is required'}), 400
    properties.append(new_property)
    return jsonify(new_property), 201

# Endpoint to update an existing property
@app.route('/properties/<int:id>', methods=['PUT'])
def update_property(id):
    update_property = request.json
    for prop in properties:
        if prop['id'] == id:
            prop.update(update_property)
            return jsonify(prop)
    return jsonify({'error': 'Property not found'}), 404

# Endpoint to delete a property
@app.route('/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    global properties
    properties = [prop for prop in properties if prop['id'] != id]
    return '', 204

# Endpoint to process payment
@app.route('/process-payment', methods=['POST'])
def process_payment():
    try:
        data = request.json
        property_id = data.get('propertyId')
        payment_method = data.get('paymentMethod')

        # Simulate processing payment
        # Add actual payment processing logic here (e.g., integrating with a payment gateway)
        # For demonstration purposes, just log and return success
        print(f"Processing payment for Property ID: {property_id} with method: {payment_method}")
        
        return jsonify({"message": "Payment processed successfully"}), 200
    
    except Exception as e:
        print(f"Payment processing error: {str(e)}")
        return jsonify({"error": "Payment processing failed"}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

if __name__ == '__main__':
    app.run(debug=True)