from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Example data (replace with your data storage logic)
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

@app.route('/properties', methods=['GET'])
def get_properties():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 1000))
    start = (page - 1) * per_page
    end = start + per_page
    return jsonify(properties[start:end])

@app.route('/properties/<int:id>', methods=['GET'])
def get_property(id):
    property = next((prop for prop in properties if prop['id'] == id), None)
    if property:
        return jsonify(property)
    else:
        return jsonify({'error': 'Property not found'}), 404

@app.route('/properties', methods=['POST'])
def create_property():
    new_property = request.json
    if 'id' not in new_property:
        return jsonify({'error': 'ID is required'}), 400
    properties.append(new_property)
    return jsonify(new_property), 201

@app.route('/properties/<int:id>', methods=['PUT'])
def update_property(id):
    update_property = request.json
    for prop in properties:
        if prop['id'] == id:
            prop.update(update_property)
            return jsonify(prop)
    return jsonify({'error': 'Property not found'}), 404

@app.route('/properties/<int:id>', methods=['DELETE'])
def delete_property(id):
    global properties
    properties = [prop for prop in properties if prop['id'] != id]
    return '', 204

# Error Handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
