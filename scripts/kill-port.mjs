import { execSync } from 'child_process';

const port = process.argv[2] || '3002';

try {
  const out = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore'],
  });

  const pids = new Set(
    out
      .split('\n')
      .map((line) => line.trim().split(/\s+/).pop())
      .filter((pid) => pid && /^\d+$/.test(pid)),
  );

  for (const pid of pids) {
    try {
      execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      console.log(`[kill-port] stopped PID ${pid} on :${port}`);
    } catch {
      // already gone
    }
  }
} catch {
  // port free
}
