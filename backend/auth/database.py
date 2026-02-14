from pymongo import MongoClient

MONGO_URI = "mongodb+srv://stockify_maker:<db_password>@cluster0.ffdpe3g.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URI)
db = client["stockify"]
users = db["users"]
