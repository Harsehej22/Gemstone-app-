# Start frontend + backend together (joint mode)
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host ""
Write-Host "  Gemstone App - Starting jointly..." -ForegroundColor Cyan
Write-Host ""

# Free ports if a previous run is still active
foreach ($port in 5000, 5173) {
    Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
        ForEach-Object {
            Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
        }
}

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starting API (port 5000) + Frontend (port 5173)..." -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  API:      http://localhost:5000/api" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop both." -ForegroundColor DarkGray
Write-Host ""

npm run dev
