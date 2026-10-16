# Generuje og:image 1200x630 dla strony gry (Windows PowerShell 5.1, System.Drawing).
# Użycie (z katalogu repo):
#   powershell -ExecutionPolicy Bypass -File tools/og-image.ps1 -Name "Tilefall" -Slug tilefall -Genre "ROGUELIKE PUZZLE"
# Plik musi zostać w UTF-8 z BOM, inaczej PowerShell 5.1 przeczyta go jako ANSI.
param(
  [string]$Name = "Tilefall",
  [string]$Genre = "ROGUELIKE PUZZLE",
  [string]$Tagline = "The floor falls away behind you.",
  [string]$Dates = "Web 28.11.2026  $([char]0xB7)  Google Play soon  $([char]0xB7)  No ads",
  [string]$Slug = "tilefall"
)

Add-Type -AssemblyName System.Drawing

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

function Color($hex, $a = 255) {
  $c = [System.Drawing.ColorTranslator]::FromHtml($hex)
  [System.Drawing.Color]::FromArgb($a, $c.R, $c.G, $c.B)
}
function RoundRect($x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $p.AddArc($x, $y, 2*$r, 2*$r, 180, 90)
  $p.AddArc($x + $w - 2*$r, $y, 2*$r, 2*$r, 270, 90)
  $p.AddArc($x + $w - 2*$r, $y + $h - 2*$r, 2*$r, 2*$r, 0, 90)
  $p.AddArc($x, $y + $h - 2*$r, 2*$r, 2*$r, 90, 90)
  $p.CloseFigure()
  $p
}

$g.Clear((Color "#0d0d10"))

# Plansza po prawej: płytki za graczem zapadają się (coraz mniejsze i bledsze).
$T = 74; $Gap = 10; $cols = 5; $rows = 6
$ox = 760; $oy = 40
for ($r = 0; $r -lt $rows; $r++) {
  for ($c = 0; $c -lt $cols; $c++) {
    $x = $ox + $c * ($T + $Gap); $y = $oy + $r * ($T + $Gap)
    # Ścieżka gracza: wiersz 3 od lewej do kolumny 3. Płytki za nim spadają.
    $fall = 0; $alpha = 255
    if ($r -eq 3 -and $c -lt 3) { $fall = (3 - $c) * 16; $alpha = [Math]::Max(40, 255 - (3 - $c) * 70) }
    if ($r -eq 2 -and $c -eq 0) { $fall = 56; $alpha = 30 }
    $path = RoundRect ($x + $fall / 2) ($y + $fall / 2) ($T - $fall) ($T - $fall) 9
    $g.FillPath((New-Object System.Drawing.SolidBrush (Color "#2b2b33" $alpha)), $path)
    $g.DrawPath((New-Object System.Drawing.Pen (Color "#3d3d48" $alpha), 2), $path)
  }
}
$px = $ox + 3 * ($T + $Gap) + $T / 2; $py = $oy + 3 * ($T + $Gap) + $T / 2
$g.FillEllipse((New-Object System.Drawing.SolidBrush (Color "#ffb547" 50)), $px - 40, $py - 40, 80, 80)
$g.FillEllipse((New-Object System.Drawing.SolidBrush (Color "#ffb547")), $px - 22, $py - 22, 44, 44)

# Gradient zasłaniający lewą krawędź planszy, żeby tekst był czytelny.
$fade = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.Rectangle 700, 0, 120, $H), (Color "#0d0d10"), (Color "#0d0d10" 0), 0.0
$g.FillRectangle($fade, 700, 0, 120, $H)

# Teksty po lewej.
$font = "Segoe UI"
$accent = New-Object System.Drawing.SolidBrush (Color "#ffb547")
$white  = New-Object System.Drawing.SolidBrush (Color "#f2f2f4")
$muted  = New-Object System.Drawing.SolidBrush (Color "#9a9aa5")
$g.DrawString($Genre, (New-Object System.Drawing.Font "Consolas", 20, ([System.Drawing.FontStyle]::Bold)), $accent, 70, 120)

# Nazwa: zmniejszaj font, aż zmieści się w 640 px.
$size = 84
do {
  $nameFont = New-Object System.Drawing.Font $font, $size, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $w = $g.MeasureString($Name, $nameFont).Width
  $size -= 4
} while ($w -gt 640 -and $size -gt 40)
$g.DrawString($Name, $nameFont, $white, 64, 165)

$tagFont = New-Object System.Drawing.Font $font, 30, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString($Tagline, $tagFont, $white, (New-Object System.Drawing.RectangleF 68, 285, 620, 90))

$small = New-Object System.Drawing.Font $font, 24, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString($Dates, $small, $muted, 68, 455)
$g.DrawString("piotrsowiak.pl/$Slug", (New-Object System.Drawing.Font "Consolas", 22, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)), $accent, 68, 520)

$out = Join-Path (Get-Location) "public/$Slug/media/og.png"
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "Zapisano $out"
