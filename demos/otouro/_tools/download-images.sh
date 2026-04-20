#!/bin/bash
# O Touro — Batch Image Downloader (CLI)
# Volvara · 2026-04-20
#
# Uso: ./download-images.sh
# Descarrega as 53 imagens do menu real para otouro-final/assets/products/
#
# Requer: curl (instalado por defeito no macOS e Windows 10+) OU wget
# Funciona em: Windows (Git Bash / WSL / PowerShell com curl), macOS, Linux

set -e

CDN="https://assets.olaclick.app/companies/products/images/800"
DEST="assets/products"

# Detectar curl ou wget
if command -v curl >/dev/null 2>&1; then
  DOWNLOADER="curl"
elif command -v wget >/dev/null 2>&1; then
  DOWNLOADER="wget"
else
  echo "❌ Erro: precisas de curl ou wget instalado."
  exit 1
fi

echo "🖼️  O Touro · Batch Image Downloader"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Downloader: $DOWNLOADER"
echo "Destino: $DEST/"
echo ""

mkdir -p "$DEST"

# Lista das 53 imagens
IMAGES=(
  "7bc3f5be-fe53-4267-b6f9-2640ec70832e.png"
  "933b0373-c90e-4763-9b13-a15eaa8e807f.png"
  "9cd4de0e-971c-4f18-a9d2-788ae37b8c1e.png"
  "0148dbe9-7fbe-49cd-ae8a-3ae101976d77.png"
  "e8b3428b-51e7-4c93-9bfc-34e00752785a.png"
  "da144590-f7b0-4339-8f76-000000000001.png"
  "ce92543c-f526-4105-bf2b-e94a773dc150.png"
  "7070aa47-7994-4dc5-ac9e-d7815ce679e7.png"
  "e255d120-0c77-4f7d-a270-70f8cbf76c6e.png"
  "93873b29-3813-44d4-a69e-1696a6bca326.png"
  "24860006-334c-45f4-9fdf-b67df30df45b.png"
  "7796f757-c957-4987-999b-100fd63a1197.png"
  "85e73985-d081-4766-8fef-e251c2c28758.jpeg"
  "13e7a70e-46b4-4c69-b633-ac7bad3a2da1.jpeg"
  "edf8e730-e9eb-459c-b90f-2624343502be.png"
  "b05532d0-0cfd-4142-b240-68f15ccdb86a.png"
  "4898127d-9d81-44d0-9e31-c13ec57a9cf5.png"
  "58d658e2-47a9-467a-ad33-e14808c21548.png"
  "a9a3a92e-1e36-4435-94fe-a3a121f9a5f3.jpeg"
  "c47d833c-ca86-4bfe-81f7-cb4cfb86351f.jpeg"
  "7b6339b0-3813-42b3-8303-35d3e499420d.jpeg"
  "c67e4452-ea63-442e-a9c4-238400283ac3.jpeg"
  "c799105d-0b7b-457a-929c-12c58bc02e22.jpeg"
  "10d96936-f66d-4207-afa8-8285cd115544.jpeg"
  "34e0c194-e9e2-4c91-aeeb-b404db0329a3.jpeg"
  "56166021-943b-4b92-bc39-9554d6ecf605.png"
  "f7b63048-d022-48d1-ab73-3369be05024d.png"
  "103c4c24-24a8-44e7-a1b8-241ab9b86c3d.png"
  "b84aefe7-38cd-45fc-b6ac-84e4c2359fc1.jpeg"
  "221cc9c2-c112-4a7e-9bf5-d65608e31aa0.jpeg"
  "438e93bc-a507-4fcf-954c-28674a55b70f.jpeg"
  "250d8f39-958a-4fef-9fab-881b4fa18769.jpeg"
  "5c163614-009c-4579-a342-ff6b74280bbd.jpeg"
  "a064d59c-6422-4cc1-9dab-231f97d994ab.jpeg"
  "b64369cf-06ee-4028-925e-60df1c06afc4.jpeg"
  "8aed2b72-0ebf-4052-aaf6-83180b057c89.jpeg"
  "5be0ccf9-506a-4ed6-9a27-0bb74579fcba.jpeg"
  "39748cb2-7d5c-4efc-8f26-003e2b92b83c.jpeg"
  "54f75544-4bdb-4f31-ab22-709993a1bcac.jpeg"
  "b0655821-3ca9-4645-ba11-4d9cd985b55d.jpeg"
  "78fd344e-e05b-497f-87df-26a1c7c654bd.jpeg"
  "241abe8e-44f9-4d13-a16f-66322dff4cb6.jpeg"
  "d7c8014d-5047-4336-ad11-20eca792f20a.jpeg"
  "de360ba6-dceb-4a80-b5f9-79b56515c61c.jpeg"
  "7bb53e1e-c193-461d-8396-95b6982d6a5b.jpeg"
  "6353616f-cfa4-46d3-ab0c-00fa216df388.jpeg"
  "9aaa3a40-0fc2-4003-b005-53247254b4f8.jpeg"
  "9d5890e6-3e43-4891-a1d1-c7cef66aa55c.jpeg"
  "4c12699e-3bda-44fb-ac41-ee2d7439781a.jpeg"
  "8ed2f33e-d57d-4df6-bc70-81282ebd7d63.jpeg"
  "e90e7979-52ae-4e91-95b7-b2aaf683255e.jpeg"
)

TOTAL=${#IMAGES[@]}
DONE=0
FAIL=0
SKIP=0

echo "A descarregar $TOTAL imagens..."
echo ""

for i in "${!IMAGES[@]}"; do
  FILE="${IMAGES[$i]}"
  NUM=$((i + 1))
  DEST_PATH="$DEST/$FILE"

  if [ -f "$DEST_PATH" ] && [ -s "$DEST_PATH" ]; then
    echo "[$NUM/$TOTAL] ⏭️  $FILE (já existe)"
    SKIP=$((SKIP + 1))
    continue
  fi

  if [ "$DOWNLOADER" = "curl" ]; then
    if curl -sSL -A "Mozilla/5.0 Volvara/1.0" -o "$DEST_PATH" "$CDN/$FILE"; then
      SIZE=$(wc -c < "$DEST_PATH" 2>/dev/null || echo 0)
      if [ "$SIZE" -gt 100 ]; then
        echo "[$NUM/$TOTAL] ✅ $FILE (${SIZE} bytes)"
        DONE=$((DONE + 1))
      else
        echo "[$NUM/$TOTAL] ❌ $FILE (ficheiro vazio)"
        rm -f "$DEST_PATH"
        FAIL=$((FAIL + 1))
      fi
    else
      echo "[$NUM/$TOTAL] ❌ $FILE (curl falhou)"
      FAIL=$((FAIL + 1))
    fi
  else
    if wget -q -U "Mozilla/5.0 Volvara/1.0" -O "$DEST_PATH" "$CDN/$FILE"; then
      echo "[$NUM/$TOTAL] ✅ $FILE"
      DONE=$((DONE + 1))
    else
      echo "[$NUM/$TOTAL] ❌ $FILE (wget falhou)"
      FAIL=$((FAIL + 1))
    fi
  fi

  # Pequeno delay para não sobrecarregar
  sleep 0.1
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Baixadas:  $DONE"
echo "⏭️  Já existiam: $SKIP"
echo "❌ Falharam:  $FAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Total em $DEST/:"
ls -1 "$DEST/" | wc -l
echo ""

if [ "$FAIL" -eq 0 ]; then
  echo "🎉 Tudo baixado com sucesso!"
else
  echo "⚠️  $FAIL imagens falharam. Correr o script de novo para retentar."
fi
