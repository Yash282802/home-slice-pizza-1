```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import uvicorn
import json

# Initialize FastAPI app
app = FastAPI()

# Initialize CORS middleware
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize SQLite database
SQLALCHEMY_DATABASE_URL = "sqlite:///example.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define SQLAlchemy models
class Contact(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    message = Column(String)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    email = Column(String)
    phone = Column(String)
    service = Column(String)
    preferred_date = Column(String)

# Create database tables
Base.metadata.create_all(bind=engine)

# Define Pydantic models
class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

class BookingRequest(BaseModel):
    customer_name: str
    email: str
    phone: str
    service: str
    preferred_date: str

# Define API endpoints
@app.post("/api/contact")
async def create_contact(contact: ContactRequest):
    db = SessionLocal()
    new_contact = Contact(name=contact.name, email=contact.email, message=contact.message)
    db.add(new_contact)
    db.commit()
    db.close()
    return JSONResponse(content={"message": "Contact created successfully"}, status_code=201)

@app.post("/api/bookings")
async def create_booking(booking: BookingRequest):
    db = SessionLocal()
    new_booking = Booking(
        customer_name=booking.customer_name,
        email=booking.email,
        phone=booking.phone,
        service=booking.service,
        preferred_date=booking.preferred_date,
    )
    db.add(new_booking)
    db.commit()
    db.close()
    return JSONResponse(content={"message": "Booking created successfully"}, status_code=201)

@app.get("/api/health")
async def get_health():
    return JSONResponse(content={"status": "healthy"}, status_code=200)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```