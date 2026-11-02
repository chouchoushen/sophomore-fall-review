param(
    [int]$Port = 8768,
    [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$pythonCandidates = @(
    "C:\Users\28175\AppData\Local\Programs\Python\Python313\python.exe",
    "python.exe"
)
$python = $pythonCandidates |
    Where-Object { $_ -eq "python.exe" -or (Test-Path -LiteralPath $_) } |
    ForEach-Object {
        if ($_ -eq "python.exe") {
            Get-Command python.exe -ErrorAction SilentlyContinue |
                Select-Object -ExpandProperty Source
        } else {
            $_
        }
    } |
    Select-Object -First 1

if (-not $python) {
    throw "Python was not found. Install Python or run any static server in this folder."
}

$url = "http://127.0.0.1:$Port/"
$listening = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue
if (-not $listening) {
    Start-Process `
        -FilePath $python `
        -ArgumentList @(
            "-m", "http.server", "$Port",
            "--bind", "127.0.0.1",
            "--directory", "`"$root`""
        ) `
        -WindowStyle Hidden
    for ($attempt = 0; $attempt -lt 20; $attempt++) {
        Start-Sleep -Milliseconds 250
        if (Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue) {
            break
        }
    }
}

Write-Host "模电复习站：$url"
if (-not $NoBrowser) {
    Start-Process $url
}
