$files = (
    ".\content-script.js",
    ".\manifest.json",
    ".\icons\"
)

Compress-Archive -Path $files -DestinationPath "AdSpeedup.zip"