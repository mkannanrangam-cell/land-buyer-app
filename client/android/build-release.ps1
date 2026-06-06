<#
  build-release.ps1 - Build a signed release AAB (and optionally APK) for Land Buyer.

  Usage (from client/android):
    .\build-release.ps1                # build AAB with current version
    .\build-release.ps1 -BumpVersion   # auto-increment versionCode, then build AAB
    .\build-release.ps1 -Apk           # also build a signed APK
    .\build-release.ps1 -BumpVersion -VersionName "1.1"   # bump code + set name

  Requires key.properties + the keystore to be present in this folder.
#>
[CmdletBinding()]
param(
    [switch]$BumpVersion,
    [switch]$Apk,
    [string]$VersionName
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$appGradle = Join-Path $root "app\build.gradle"

# Use Android Studio's bundled JDK if JAVA_HOME isn't already set.
if (-not $env:JAVA_HOME) {
    $jbr = "C:\Program Files\Android\Android Studio\jbr"
    if (Test-Path $jbr) { $env:JAVA_HOME = $jbr }
}

if (-not (Test-Path (Join-Path $root "key.properties"))) {
    throw "key.properties not found in $root - cannot sign the release build."
}

# --- Optional version bump ---------------------------------------------------
if ($BumpVersion -or $VersionName) {
    $content = Get-Content $appGradle -Raw

    if ($BumpVersion) {
        $m = [regex]::Match($content, 'versionCode\s+(\d+)')
        if (-not $m.Success) { throw "Could not find versionCode in app build.gradle" }
        $current = [int]$m.Groups[1].Value
        $next = $current + 1
        $content = [regex]::Replace($content, 'versionCode\s+\d+', "versionCode $next")
        Write-Host "versionCode: $current -> $next" -ForegroundColor Cyan
    }

    if ($VersionName) {
        $content = [regex]::Replace($content, 'versionName\s+"[^"]*"', "versionName `"$VersionName`"")
        Write-Host "versionName set to $VersionName" -ForegroundColor Cyan
    }

    Set-Content -Path $appGradle -Value $content -Encoding UTF8
}

# --- Build -------------------------------------------------------------------
$gradlew = Join-Path $root "gradlew.bat"
$tasks = @("bundleRelease")
if ($Apk) { $tasks += "assembleRelease" }

Write-Host "Building: $($tasks -join ', ')" -ForegroundColor Green
& $gradlew -p $root @tasks
if ($LASTEXITCODE -ne 0) { throw "Gradle build failed with exit code $LASTEXITCODE" }

# --- Report output -----------------------------------------------------------
$aab = Join-Path $root "app\build\outputs\bundle\release\app-release.aab"
Write-Host ""
Write-Host "BUILD SUCCESSFUL" -ForegroundColor Green
if (Test-Path $aab) {
    $size = "{0:N1} MB" -f ((Get-Item $aab).Length / 1MB)
    Write-Host "AAB ($size): $aab" -ForegroundColor Yellow
}
if ($Apk) {
    $apk = Join-Path $root "app\build\outputs\apk\release\app-release.apk"
    if (Test-Path $apk) {
        $size = "{0:N1} MB" -f ((Get-Item $apk).Length / 1MB)
        Write-Host "APK ($size): $apk" -ForegroundColor Yellow
    }
}
