set -e
echo "Starting production build..."
npm run build:prod
echo "Preparing build folder..."
rm -rf build/front
mkdir -p build/front
echo "Copying browser output to root..."
cp -r dist/panel/browser/* build/front/
cp dist/panel/prerendered-routes.json build/front/ 2>/dev/null || true
cp dist/panel/3rdpartylicenses.txt build/front/ 2>/dev/null || true
echo "Adding GitHub Pages SPA fallback..."
cp build/front/index.html build/front/404.html
rm -rf dist
echo "Final build structure:"
ls -la build/front
echo "Build finished successfully ✅"
