$script = "./content-script.js"
$manifest = "./manifest.json"

$iconsFolder = "./icons/"

$files = @($script, $manifest, $iconsFolder)

$command = "7z a -tzip ./package.zip " + $files

Invoke-Expression $command