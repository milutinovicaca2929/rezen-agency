import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawn } from 'child_process';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = process.env.PORT || '3002';
const buildId = path.join(root, '.next', 'BUILD_ID');

process.chdir(root);

try {
  execSync(`node scripts/kill-port.mjs ${port}`, { stdio: 'inherit' });
} catch {
  // ignore
}

if (!existsSync(buildId)) {
  console.log('\n[serve] No build found — running next build (first time ~1 min)...\n');
  execSync('npm run build', { stdio: 'inherit' });
}

console.log(`\n[serve] http://localhost:${port}\n`);

const child = spawn('npx', ['next', 'start', '--port', port], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
