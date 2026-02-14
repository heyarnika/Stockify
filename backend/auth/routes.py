from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from auth.database import users

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)

@router.post("/signup")
def signup(data: dict):
    if users.find_one({"email": data["email"]}):
        raise HTTPException(status_code=400, detail="User already exists")

    users.insert_one({
        "fullName": data["fullName"],
        "email": data["email"],
        "password": hash_password(data["password"])
    })

    return {"message": "Account created successfully"}

@router.post("/login")
def login(data: dict):
    user = users.find_one({"email": data["email"]})

    if not user or not verify_password(data["password"], user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {"message": "Login successful"}
