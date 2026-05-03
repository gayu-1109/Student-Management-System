from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Mysql@2468",
    database="sms_db"
)

cursor = db.cursor(dictionary=True)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()

    if user:
        return jsonify({"success": True})
    return jsonify({"success": False})

import re

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data["email"]
    password = data["password"]

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"success": False, "message": "Invalid email format"})

    if len(password) < 4:
        return jsonify({"success": False, "message": "Password too short"})

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    if cursor.fetchone():
        return jsonify({"success": False, "message": "User already exists"})

    cursor.execute(
        "INSERT INTO users (email, password) VALUES (%s,%s)",
        (email, password)
    )
    db.commit()

    return jsonify({"success": True})



@app.route("/students", methods=["GET"])
def get_students():
    cursor.execute("SELECT * FROM students")
    return jsonify(cursor.fetchall())

@app.route("/students", methods=["POST"])
def add_student():
    data = request.json
    cursor.execute(
        "INSERT INTO students (name,email,course,phone) VALUES (%s,%s,%s,%s)",
        (data["name"], data["email"], data["course"], data["phone"])
    )
    db.commit()
    return jsonify({"message": "Student added"})

@app.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    cursor.execute("DELETE FROM students WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Deleted"})

@app.route("/students/<int:id>", methods=["GET"])
def get_single_student(id):
    cursor.execute("SELECT * FROM students WHERE id=%s", (id,))
    student = cursor.fetchone()
    return jsonify(student)

@app.route("/students/<int:id>", methods=["PUT"])
def update_student(id):
    data = request.json
    cursor.execute(
        "UPDATE students SET name=%s,email=%s,course=%s,phone=%s WHERE id=%s",
        (data["name"], data["email"], data["course"], data["phone"], id)
    )
    db.commit()
    return jsonify({"message": "Updated"})

if __name__ == '__main__':
    app.run(port=5000,debug=True)