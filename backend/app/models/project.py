from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.config import Base

class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    client_name = Column(String(255), nullable=False)
    project_manager = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False)
    billing_progress = Column(Float, default=0)
    onsite_progress = Column(Float, default=0)
    total_scope = Column(Float, default=0)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    boqs = relationship("BOQ", back_populates="project", cascade="all, delete-orphan") 