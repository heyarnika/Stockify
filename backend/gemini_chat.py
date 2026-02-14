import google.generativeai as genai
import os

# Set your Gemini API key
genai.configure(api_key="AIzaSyBpeQbbWY68XxloDd7eAgsYowKjFNOdQ40")

model = genai.GenerativeModel("gemini-pro")

def get_chat_response(user_message):
    try:
        response = model.generate_content(
            f"You are a finance assistant. Answer clearly and simply.\nUser: {user_message}"
        )

        return response.text

    except Exception as e:
        return f"Error: {str(e)}"