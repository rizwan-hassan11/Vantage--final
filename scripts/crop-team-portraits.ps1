# Re-frames the team photos as head-and-shoulders portraits at the 3:4 ratio of
# the team card, so every face lands at the same size and height in the grid.
# Crop windows were measured per photo from the face box; each is scaled with
# lanczos and lightly sharpened because the sources are only 400x600.

$src = "public\Images_for_web\Photos for Web"
$out = "public\team\portraits"
New-Item -ItemType Directory -Force -Path $out | Out-Null

# file | slug | crop w | crop h | crop x | crop y
$crops = @(
  @("Ali Touqeer GM",          "ali-touqir",   217, 290,  97,  86),
  @("Amir Nawaz CFO",          "amer-nawaz",   187, 250, 113, 132),
  @("Imbesat Adnan",           "imbesat-adnan",192, 257, 107, 100),
  @("Usman Sales",             "mian-usman",   237, 316,  86,  98),
  @("Zubair Sales",            "zubair-alam",  205, 273, 111, 110),
  @("Naveed Sales",            "naveed-bhatti",200, 266, 103, 119),
  @("Adnan Sales",             "adnan-ahmed",  212, 283, 112,  89),
  @("Alian Sales",             "alian-hafeez", 208, 277,  86,  92),
  @("Qasim Design",            "qasim-raza",   192, 257, 162, 167),
  @("Asmer Manager Pre-Press", "syed-asmer",   205, 273,  50, 100)
)

foreach ($c in $crops) {
  $file = "$src\$($c[0]).jpg"
  $target = "$out\$($c[1]).webp"
  & ffmpeg -y -loglevel error -i $file `
    -vf "crop=$($c[2]):$($c[3]):$($c[4]):$($c[5]),scale=480:640:flags=lanczos,unsharp=5:5:0.65:5:5:0.0" `
    -c:v libwebp -quality 92 -compression_level 6 $target
  Write-Host "$($c[1]) <- $($c[0])"
}

Get-ChildItem $out -File | ForEach-Object {
  $d = & ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $_.FullName
  "{0,-22} {1,8:N0}  {2}" -f $_.Name, $_.Length, $d
}
