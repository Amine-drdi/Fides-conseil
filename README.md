# FIDES CONSEIL — Site vitrine

Site React + Vite + Supabase. Déploiement automatique vers Infomaniak via GitHub Actions (FTP).

## Structure du dépôt

- `app-src.tar.gz.b64` : l'arborescence complète du code source (src/, public/, configs Vite/Tailwind/TS), compressée puis encodée en base64. Le workflow la décode et la restaure avant le build.
- `assets-b64/` : les images de `public/images/`, encodées en base64 (un fichier `.b64` par image), restaurées par le workflow avant le build.
- `.github/workflows/deploy.yml` : pipeline de build et déploiement FTP.

## Fonctionnement

Toute modification poussée sur `main` déclenche :

1. Décodage de `app-src.tar.gz.b64` et restauration du code source
2. Décodage des images dans `public/images/`
3. `npm install` puis `npm run build`
4. Déploiement du dossier `dist/` vers Infomaniak par FTP

## Secrets requis (Settings → Secrets and variables → Actions)

- `FTP_SERVER` : adresse du serveur FTP Infomaniak
- `FTP_USERNAME` : identifiant du compte FTP
- `FTP_PASSWORD` : mot de passe du compte FTP
- `FTP_SERVER_DIR` : dossier cible sur l'hébergement (ex. `web/`)
