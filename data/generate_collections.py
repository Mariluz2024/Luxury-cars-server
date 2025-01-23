import json

# Base URL for the endpoints
base_url = "{host}"

# Collection template
def create_postman_collection(name, endpoints):
    return {
        "info": {
            "name": name,
            "_postman_id": "12345678-abcd-1234-abcd-12345678abcd",
            "description": f"Postman collection for {name}",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        "item": endpoints
    }

# Generate endpoint structure
def create_endpoint(name, method, url, body=None):
    endpoint = {
        "name": name,
        "request": {
            "method": method,
            "header": [
                {
                    "key": "Content-Type",
                    "value": "application/json"
                }
            ],
            "url": {
                "raw": base_url + url,
                "host": [base_url],
                "path": url.strip("/").split("/")
            }
        }
    }
    if body:
        endpoint["request"]["body"] = {
            "mode": "raw",
            "raw": json.dumps(body, indent=2)
        }
    return endpoint

# Define the routes for each collection
collections = {
    "Auth Routes": [
        create_endpoint("Register", "POST", "/auth/register", {"username": "testuser", "password": "securepassword"}),
        create_endpoint("Login", "POST", "/auth/login", {"username": "testuser", "password": "securepassword"}),
        create_endpoint("Logout", "GET", "/auth/logout")
    ],
    "Cars Routes": [
        create_endpoint("Get All Cars", "GET", "/cars"),
        create_endpoint("Get Car by ID", "GET", "/cars/:id"),
        create_endpoint("Create Car", "POST", "/cars", {"brand": "Toyota", "model": "Corolla", "year": 2023, "price": 20000}),
        create_endpoint("Update Car", "PUT", "/cars/:id", {"price": 19000}),
        create_endpoint("Delete Car", "DELETE", "/cars/:id")
    ],
    "Comparison Routes": [
        create_endpoint("Get All Comparisons", "GET", "/comparisons"),
        create_endpoint("Get Comparison by ID", "GET", "/comparisons/:id"),
        create_endpoint("Create Comparison", "POST", "/comparisons", {"carA": "Toyota Corolla", "carB": "Honda Civic", "attributes": ["price", "performance"]}),
        create_endpoint("Update Comparison", "PUT", "/comparisons/:id", {"attributes": ["price", "reliability"]}),
        create_endpoint("Delete Comparison", "DELETE", "/comparisons/:id")
    ],
    "Favorites Routes": [
        create_endpoint("Get All Favorites", "GET", "/favorites"),
        create_endpoint("Add Favorite", "POST", "/favorites", {"userId": 1, "carId": 123}),
        create_endpoint("Remove Favorite", "DELETE", "/favorites", {"userId": 1, "carId": 123})
    ],
    "Ratings Routes": [
        create_endpoint("Get All Ratings", "GET", "/ratings"),
        create_endpoint("Get Rating by ID", "GET", "/ratings/:id"),
        create_endpoint("Create Rating", "POST", "/ratings", {"carId": 123, "rating": 4.5, "review": "Great car!"}),
        create_endpoint("Update Rating", "PUT", "/ratings/:id", {"rating": 5, "review": "Changed my mind, it's perfect!"}),
        create_endpoint("Delete Rating", "DELETE", "/ratings/:id")
    ],
    "Sales Routes": [
        create_endpoint("Get All Sales", "GET", "/sales"),
        create_endpoint("Get Sale by ID", "GET", "/sales/:id"),
        create_endpoint("Create Sale", "POST", "/sales", {"userId": 1, "carId": 123, "price": 19000}),
        create_endpoint("Update Sale", "PUT", "/sales/:id", {"price": 18500}),
        create_endpoint("Delete Sale", "DELETE", "/sales/:id")
    ]
}

# Generate the Postman collections
postman_collections = [create_postman_collection(name, endpoints) for name, endpoints in collections.items()]

# Save to a JSON file
output_path = "Postman_Collections.json"
with open(output_path, "w") as file:
    json.dump({"collections": postman_collections}, file, indent=2)

print(f"Postman collections saved to {output_path}")
