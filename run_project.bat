@echo off
title PremierCare Launcher
echo ===================================================
echo             PREMIER CARE SYSTEM LAUNCHER
echo ===================================================
echo.
echo [1/2] Starting Django Backend (premierhealthcare)...
start "PremierCare Django Backend" cmd /k "cd /d %~dp0front_end\premierhealthcare && python manage.py runserver 127.0.0.1:8000"

echo [2/2] Starting Next.js Frontend (front_end)...
start "PremierCare Next.js Frontend" cmd /k "cd /d %~dp0front_end && npm run dev"

echo.
echo ===================================================
echo Success! Both projects are opening in new windows.
echo - Django Backend: http://127.0.0.1:8000
echo - Django Admin: http://127.0.0.1:8000/django-admin/
echo - Next.js Frontend: http://localhost:3000
echo ===================================================
echo.
pause
