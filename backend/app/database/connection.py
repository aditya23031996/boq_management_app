# app/database/connection.py

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from .config import SQLALCHEMY_DATABASE_URL

# 1. Create the SQLAlchemy engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,            # Enable SQL query logging
    fast_executemany=True # Optimize bulk inserts
)

# 2. Declare a Base for models to inherit from
Base = declarative_base()

# 3. Create a session factory
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

def get_db():
    """
    Dependency for FastAPI (or similar frameworks).
    Yields a database session, then closes it.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()