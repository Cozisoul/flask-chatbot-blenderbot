# Import render_template to serve HTML files
from flask import Flask, request, render_template
from flask_cors import CORS
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import os

# --- 1. SETUP ---
app = Flask(__name__)
CORS(app)

MODEL_NAME = "facebook/blenderbot-400M-distill"
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
print(f"Successfully loaded model: {MODEL_NAME}")

# --- 2. API ENDPOINTS ---

# MODIFIED: This now serves your HTML front-end
@app.route('/')
def home():
    """Serves the main HTML page for the chatbot."""
    return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def chatbot_endpoint():
    """The main endpoint to handle chatbot conversations."""
    if not request.is_json:
        return {"error": "Request must be a JSON"}, 400

    data = request.get_json()
    user_input = data.get("prompt")
    
    if not user_input:
        return {"error": "Missing 'prompt' in request body"}, 400

    try:
        inputs = tokenizer(user_input, return_tensors="pt")
        outputs = model.generate(**inputs, max_length=60)
        response_text = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
        return {"response": response_text}
    except Exception as e:
        print(f"Error during model inference: {e}")
        return {"error": "Failed to generate a response"}, 500

# --- 3. RUN THE APP ---
if __name__ == '__main__':
    # Check if the app is running in debug mode
    is_debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=5000, debug=is_debug)