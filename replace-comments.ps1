$content = Get-Content "src\style.css" -Encoding UTF8 -Raw

$content = $content -replace  [regex]::Escape('/* "얇은 하이라인" 느낌 */'), '/* Thin highlight effect */'
$content = $content  -replace [regex]::Escape('/* Windows에서도 "브랜드가 또렷해 보이게" */'), '/* Make brand crisp even on Windows */'
$content = $content -replace [regex]::Escape('/* ✅ "Glass highlight"를 더 분명하게, 하지만 텍스트를 흐리지 않게 */'), '/* ✅ Make glass highlight more visible without blurring text */'
$content = $content -replace [regex]::Escape('/* 스트라이프는 "거의 보이지 않을 정도"로만 */'), '/* Stripes should be barely visible */'

$content | Set-Content "src\style.css" -Encoding UTF8 -NoNewline

Write-Host "Replacements complete"
