# Full-Stack AI Chatbot with Flask and BlenderBot

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-black.svg)](https://flask.palletsprojects.com/)
[![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Transformers-yellow.svg)](https://huggingface.co/docs/transformers/index)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This repository contains a full-stack, conversational AI chatbot application. The project was developed as part of the **"Building Generative AI-Powered Applications with Python"** course by IBM on Coursera. It demonstrates the end-to-end process of wrapping a Hugging Face language model in a Flask API backend and connecting it to a custom-branded, interactive web front-end.

## Live Demo & Screenshot

**You can try the live application here:** [Your Hugging Face Spaces URL will go here]

*The final application, styled according to a personal brand bible, showing a live conversation.*
![Final Application Screenshot](./final-app-screenshot.png) <!-- TODO: Add a screenshot of your final app and name it correctly! -->

## Features

*   **Full-Stack Architecture:** A complete client-server application with a Python/Flask backend and an HTML/CSS/JS frontend.
*   **Custom-Branded UI:** The user interface is fully styled according to a personal brand identity guide, demonstrating a keen eye for UI/UX and product polish.
*   **RESTful API Backend:** A Flask server provides a `/chatbot` endpoint that accepts JSON requests and returns AI-generated responses.
*   **Conversational AI:** Integrates the `facebook/blenderbot-400M-distill` model from Hugging Face to generate human-like text responses.
*   **Deployment Ready:** Includes a `Dockerfile` for easy containerization and deployment to any cloud platform.

## Tech Stack

*   **Backend:** Python, Flask, Hugging Face Transformers, PyTorch
*   **Frontend:** HTML, CSS, JavaScript
*   **DevOps:** Docker, Git, Conda & Pip for environment management

---

## Setup and Running Locally

**1. Clone the Repository**
```bash
git clone https://github.com/Cozisoul/flask-chatbot-blenderbot.git
cd flask-chatbot-blenderbot
```

**2. Create and Activate a Virtual Environment**
This project uses a mix of Conda and Pip for robust dependency management.

```bash
# Create a new Conda environment
conda create --name ai-chatbot python=3.9 -y

# Activate the environment
conda activate ai-chatbot
```

**3. Install Dependencies**
First, install complex packages with Conda, then the rest with Pip.
```bash
# Install sentencepiece with conda-forge
conda install -c conda-forge sentencepiece

# Install the remaining packages with pip
pip install -r requirements.txt
```

**4. Run the Full-Stack Application**
```bash
python app.py
```
*The server will start. Open your web browser and navigate to `http://127.0.0.1:5000` to use the chatbot.*

---

## Project Journey: Challenges & Key Learnings

This project was an immersive exercise in full-stack development, highlighting the critical interplay between backend logic, frontend presentation, and the environment they run in.

### Key Challenges

*   **Complex Dependency Management:** The `sentencepiece` library failed to install via `pip` due to a missing C++ compiler on the local machine. This was a classic source-build error that was efficiently solved by leveraging **Conda's** powerful package management to install a pre-compiled binary, a crucial lesson in using the right tool for the job.

*   **Frontend-Backend Integration:** A classic full-stack debugging challenge occurred where the frontend displayed raw JSON (`{"response": "..."}`) instead of the clean message. This was solved by modifying the JavaScript `fetch` call to correctly parse the JSON with `response.json()` and then access the `.response` property, reinforcing the importance of understanding data contracts between client and server.

*   **Improving on Course Material:** The initial lab design used a global variable for conversation history, which is a major flaw in a multi-user web environment. I re-engineered the backend to use a **stateless API design**, where each request is independent. This is a far more robust and scalable approach aligned with professional web development standards.

### Core Competencies Gained

*   **Full-Stack Development:** Successfully built and connected a JavaScript frontend to a Python/Flask backend, managing the flow of data from user input to AI response and back to the UI.

*   **API Design & Implementation:** Developed a clean, RESTful API endpoint using Flask that handles JSON data, processes it with an AI model, and returns a structured JSON response.

*   **Advanced Environment Management:** Gained practical experience using a hybrid Conda and Pip workflow to handle both complex, compiled packages and standard Python libraries, a common practice in professional data science.

*   **UI/UX Personalization:** Demonstrated a strong attention to product detail by moving beyond a generic template. I fully customized the HTML and CSS to implement a personal brand bible, creating a polished and unique user experience.

## Future Improvements

*   **Stateful Conversations:** Implement a session-based system (e.g., using Flask sessions or a database) to maintain a unique conversation history for each user.
*   **Real-time UI:** Add a "Bot is typing..." indicator on the frontend for a more dynamic user experience.
*   **Cloud Deployment:** Deploy the containerized application to a public cloud service like Hugging Face Spaces or AWS to make it accessible to everyone.

## Acknowledgments & References

*   **Course:** The project structure and core concepts were learned in the **Building Generative AI-Powered Applications with Python** course by **IBM** on **Coursera**.
*   **AI Model:** The conversational AI is powered by the **BlenderBot 400M-Distill** model, created by **Meta AI** and hosted on Hugging Face.
*   **Web Framework:** The backend server is built with **Flask**.
*   **Frontend Template:** The initial HTML and CSS structure was adapted from a template provided by the **IBM Developer Skills Network**.

## License
This project is licensed under the MIT License.