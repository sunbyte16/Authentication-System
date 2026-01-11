#!/usr/bin/env python3
"""
Quick setup script to create the first admin user
"""
import requests
import json

def create_admin():
    print("=== FastAPI + React Auth System - Admin Setup ===")
    print()
    
    # Get admin details
    email = input("Admin Email: ")
    username = input("Admin Username: ")
    password = input("Admin Password: ")
    first_name = input("First Name (optional): ")
    last_name = input("Last Name (optional): ")
    
    # Create admin user
    admin_data = {
        "email": email,
        "username": username,
        "password": password,
        "first_name": first_name,
        "last_name": last_name
    }
    
    try:
        response = requests.post("http://localhost:8000/setup-admin", json=admin_data)
        
        if response.status_code == 200:
            print("\n✅ Admin user created successfully!")
            print(f"Email: {email}")
            print(f"Username: {username}")
            print("\nYou can now login at: http://localhost:3000")
        else:
            print(f"\n❌ Error: {response.json().get('detail', 'Unknown error')}")
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Cannot connect to backend server.")
        print("Make sure the backend is running on http://localhost:8000")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")

if __name__ == "__main__":
    create_admin()