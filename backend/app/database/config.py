# app/database/config.py
import os, urllib.parse
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

# 1) Load .env for credentials/config
load_dotenv()  

# 2) Read your DB settings from environment (or hard-code for now)
DRIVER   = os.getenv("DB_DRIVER", "ODBC Driver 17 for SQL Server")
SERVER   = os.getenv("DB_SERVER", "(localdb)\\local")
DATABASE = os.getenv("DB_NAME", "boq_management_db")
TRUSTED  = os.getenv("DB_TRUSTED", "yes")

# 3) Build & URL-encode the ODBC connection string
odbc = (
    f"Driver={{{DRIVER}}};"
    f"Server={SERVER};"
    f"Database={DATABASE};"
    f"Trusted_Connection={TRUSTED};"
)
connect_str = urllib.parse.quote_plus(odbc)

# 4) Create the SQLAlchemy engine
SQLALCHEMY_DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={connect_str}"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,            # show SQL in console
    fast_executemany=True # speed up bulk inserts
)

# 5) Base class for all models
Base = declarative_base()
