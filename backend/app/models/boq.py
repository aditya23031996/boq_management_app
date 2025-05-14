from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship, backref
from datetime import datetime
from ..database.config import Base

class BOQ(Base):
    __tablename__ = "boqs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    total_amount = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    project = relationship("Project", back_populates="boqs")
    items = relationship("BOQItem", back_populates="boq", cascade="all, delete-orphan")

    class Config:
        orm_mode = True

class BOQItem(Base):
    __tablename__ = "boq_items"

    id = Column(Integer, primary_key=True, index=True)
    boq_id = Column(Integer, ForeignKey("boqs.id", ondelete="CASCADE"))
    parent_item_id = Column(Integer, ForeignKey("boq_items.id"), nullable=True)
    wbs_id = Column(String(100), nullable=True)
    category1 = Column(String(100), nullable=True)
    category2 = Column(String(100), nullable=True)
    category3 = Column(String(100), nullable=True)
    description = Column(String(500), nullable=False)
    uom = Column(String(50), nullable=True)
    scope_quantity = Column(Float, nullable=True)
    sor = Column(Float, nullable=True)
    total_amount = Column(Float, nullable=True)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    boq = relationship("BOQ", back_populates="items")
    sub_items = relationship("BOQItem", backref=backref("parent", remote_side=[id]), cascade="all, delete-orphan")
    payment_breakups = relationship("PaymentBreakup", back_populates="boq_item", cascade="all, delete-orphan")

    class Config:
        orm_mode = True

class PaymentBreakup(Base):
    __tablename__ = "payment_breakups"

    id = Column(Integer, primary_key=True, index=True)
    boq_item_id = Column(Integer, ForeignKey("boq_items.id", ondelete="CASCADE"))
    description = Column(String(255), nullable=False)
    percentage = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    boq_item = relationship("BOQItem", back_populates="payment_breakups")

    class Config:
        orm_mode = True
