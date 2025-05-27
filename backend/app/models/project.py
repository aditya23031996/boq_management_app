from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database.config import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(255), nullable=True)
    location = Column(String(255), nullable=True)
    client_name = Column(String(255), nullable=False)
    project_manager = Column(String(255), nullable=True)
    status = Column(String(50), nullable=True)
    billing_progress = Column(Integer, default=0)
    onsite_progress = Column(Integer, default=0)
    total_scope = Column(Integer, default=0)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))

    boqs = relationship("BOQ", back_populates="project", cascade="all, delete-orphan") 