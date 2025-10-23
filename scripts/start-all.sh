#!/bin/bash

# Start all services for development

echo "🚀 Starting Christian Community Platform..."
echo ""

# Start backend
echo "Starting backend API..."
cd backend-api
npm run dev &
BACKEND_PID=$!

sleep 3

# Start main platform
echo "Starting main platform..."
cd ../main-platform
npm run dev &
MAIN_PID=$!

echo ""
echo "✓ Services started!"
echo ""
echo "Main Platform: http://localhost:5173"
echo "Backend API: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "kill $BACKEND_PID $MAIN_PID; exit" INT
wait
