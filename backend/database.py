from pymongo import MongoClient
import os

MONGO_URI = "mongodb+srv://stockify_maker:.Sqpiysswq296Lr@cluster0.ffdpe3g.mongodb.net/"

client = MongoClient(MONGO_URI)
db = client["stockify"]

users = db["users"]
predictions = db["predictions"]
