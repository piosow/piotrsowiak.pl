# Generuje og:image 1200x630 dla strony gry (Windows PowerShell 5.1, System.Drawing).
# Użycie (z katalogu repo):
#   powershell -ExecutionPolicy Bypass -File tools/og-image.ps1 -Name "Tilefall" -Slug tilefall -Genre "ROGUELIKE PUZZLE"
# Po prawej wkleja prawdziwy zrzut planszy z gry (-Board, domyślnie public/<slug>/media/board.png, kwadrat),
# po lewej teksty w kolorach ekranu tytułowego gry. Zrzut planszy: docs/DEPLOY.md, „Strona gry”.
# Plik musi zostać w UTF-8 z BOM, inaczej PowerShell 5.1 przeczyta go jako ANSI.
param(
  [string]$Name = "Tilefall",
  [string]$Genre = "ROGUELIKE PUZZLE",
  [string]$Tagline = "The floor falls away behind you.",
  [string]$Dates = "Web 28.11.2026  $([char]0xB7)  Google Play soon  $([char]0xB7)  No ads",
  [string]$Slug = "tilefall",
  [string]$Board = ""
)

Add-Type -AssemblyName System.Drawing
if (-not $Board) { $Board = Join-Path (Get-Location) "public/$Slug/media/board.png" }
if (-not (Test-Path $Board)) { throw "Brak zrzutu planszy: $Board" }

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

function Color($hex, $a = 255) {
  $c = [System.Drawing.ColorTranslator]::FromHtml($hex)
  [System.Drawing.Color]::FromArgb($a, $c.R, $c.G, $c.B)
}
function Brush($hex) { New-Object System.Drawing.SolidBrush (Color $hex) }
function Font($family, $px, $style = "Regular") {
  New-Object System.Drawing.Font $family, $px, ([System.Drawing.FontStyle]::$style), ([System.Drawing.GraphicsUnit]::Pixel)
}

# Kolory z index.html gry: tło, ramki, tekst, złoty tytuł.
$bg = "#17121c"; $edge = "#0b0a10"; $text = "#f3e9d7"; $muted = "#a8998a"; $gold = "#ffd34d"
$g.Clear((Color $bg))

# Plansza po prawej w ramce z „wyciętymi” rogami jak przyciski gry (cztery prostokąty zamiast obramowania).
$S = 556; $bx = $W - $S - 37; $by = [int](($H - $S) / 2); $f = 6
$frame = Brush $edge
$g.FillRectangle($frame, $bx, $by - $f, $S, $f); $g.FillRectangle($frame, $bx, $by + $S, $S, $f)
$g.FillRectangle($frame, $bx - $f, $by, $f, $S); $g.FillRectangle($frame, $bx + $S, $by, $f, $S)
$img = [System.Drawing.Image]::FromFile((Resolve-Path $Board))
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($img, $bx, $by, $S, $S)
$img.Dispose()

# Teksty po lewej, jak ekran tytułowy gry: złota nazwa wersalikami z twardym cieniem, podtytuł z rozstrzeleniem.
$left = 64; $maxW = $bx - $left - 48
$shadow = Brush $edge
$genreFont = Font "Segoe UI" 20 "Bold"
$x = $left
foreach ($ch in $Genre.ToCharArray()) {
  $g.DrawString([string]$ch, $genreFont, (Brush $muted), $x, 118)
  $x += $g.MeasureString([string]$ch, $genreFont, 200, [System.Drawing.StringFormat]::GenericTypographic).Width + 5
}

# Nazwa: zmniejszaj font, aż zmieści się obok planszy.
$title = $Name.ToUpper()
$size = 112
do {
  $nameFont = Font "Segoe UI Black" $size
  $w = $g.MeasureString($title, $nameFont).Width
  $size -= 4
} while ($w -gt $maxW -and $size -gt 40)
$g.DrawString($title, $nameFont, $shadow, $left - 6 + 6, 150 + 6)
$g.DrawString($title, $nameFont, (Brush $gold), $left - 6, 150)

$g.DrawString($Tagline, (Font "Segoe UI" 30), (Brush $text), (New-Object System.Drawing.RectangleF ($left + 2), 300, $maxW, 90))
$g.DrawString($Dates, (Font "Segoe UI" 22), (Brush $muted), $left + 2, 462)
$g.DrawString("piotrsowiak.pl/$Slug", (Font "Consolas" 22), (Brush $gold), $left + 2, 520)

$out = Join-Path (Get-Location) "public/$Slug/media/og.png"
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "Zapisano $out"
