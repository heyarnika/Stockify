import google.generativeai as genai

# Put your API key
genai.configure(api_key="AIzaSyBXaLOkOkG5clW5dhYz9qijV-wFDk4rYiU")

# USE A WORKING MODEL FROM YOUR LIST
model = genai.GenerativeModel("models/gemini-2.5-flash")

def get_chat_response(user_message):
    try:
        prompt = f"You are a finance assistant. Answer clearly and simply.\nUser: {user_message}"
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return "Gemini Error: " + str(e)
