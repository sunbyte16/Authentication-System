import os
from database import engine, Base

def reset_database():
    # Remove the database file if it exists
    db_file = "auth.db"
    if os.path.exists(db_file):
        os.remove(db_file)
        print(f"Removed existing database: {db_file}")
    
    # Recreate all tables
    Base.metadata.create_all(bind=engine)
    print("Database reset complete!")

if __name__ == "__main__":
    reset_database()