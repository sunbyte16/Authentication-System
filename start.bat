@echo off
echo Starting FastAPI + React Authentication System...
echo.

echo Starting FastAPI backend...
start cmd /k "cd backend && python run.py"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting React frontend...
start cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause