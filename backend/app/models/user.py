from sqlalchemy import Column, Integer, String, DateTime, func
from ..database.config import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    company_name = Column(String(255))
    company_gst = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
