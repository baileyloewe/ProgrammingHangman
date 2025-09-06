#!/bin/bash

# Get port from first argument, default to 3042
PORT=${1:-3042}

echo "Starting Programming Hangman Site on port $PORT..."
echo "Building and running with Docker..."
export PORT=$PORT

docker-compose up --build

echo "Visit http://localhost:$PORT"