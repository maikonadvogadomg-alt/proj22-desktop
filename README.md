# proj22 — App Desktop

Aplicativo gerado pelo APK Builder para Windows, Mac e Linux.

## Como compilar

### Usando GitHub Actions (automático)
1. Suba este repositório no GitHub
2. O workflow `.github/workflows/build-desktop.yml` compila automaticamente
3. Baixe os executáveis na aba **Actions → Artifacts**

### Manualmente
```bash
npm install
npm run build
```

Os arquivos estarão em `dist/`:
- **Windows**: `proj22-Setup-1.0.0.exe`
- **Mac**: `proj22-1.0.0.dmg`
- **Linux**: `proj22-1.0.0.AppImage`

## Requisitos
- Node.js 18+
- npm

## Gerado por
[APK Builder](https://replit.com) — Maikon Caldeira
