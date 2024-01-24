param (
    [switch]$Firefox
)

$script = ".\content-script.js"
$manifest = ".\manifest.json"
$iconsFolder = ".\icons\"

if ($Firefox) {
    Copy-Item -Path ".\manifest-firefox.json" -Destination $manifest
    $packageName = ".\package-firefox.zip"
} else {
    Copy-Item -Path ".\manifest-chrome.json" -Destination $manifest
    $packageName = ".\package-chrome.zip"
}

$files = @($script, $manifest, $iconsFolder)

$command = "7z a -tzip " + $packageName + " " + $files

Write-Host $command

Invoke-Expression $command