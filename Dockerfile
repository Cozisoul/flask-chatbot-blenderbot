# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application's code into the container
COPY app.py .

# Expose the port the app runs on (Flask's default is 5000)
EXPOSE 5000

# Define the command to run your app when the container starts
CMD ["python", "app.py"]