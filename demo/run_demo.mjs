import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('=====================================================');
console.log('     ACLyze AI — Portfolio Demo Environment          ');
console.log('=====================================================');
console.log('Starting services:');
console.log('  1. AI Model Simulator : http://127.0.0.1:8000');
console.log('  2. Node/Express Backend: http://127.0.0.1:3000');
console.log('  3. Angular Frontend    : http://localhost:4200');
console.log('-----------------------------------------------------');

const processes = [];

function startProcess(name, command, args, cwd) {
  console.log(`[${name}] Launching...`);
  const proc = spawn(command, args, {
    cwd,
    stdio: 'pipe',
    shell: true
  });

  proc.stdout.on('data', (data) => {
    const line = data.toString().trim();
    if (line) console.log(`[${name}] ${line}`);
  });

  proc.stderr.on('data', (data) => {
    const line = data.toString().trim();
    if (line) console.error(`[${name} ERROR] ${line}`);
  });

  proc.on('close', (code) => {
    console.log(`[${name}] Process exited with code ${code}`);
  });

  processes.push({ name, proc });
  return proc;
}

// 1. Model Simulator
startProcess('AI-MODEL', 'python', ['demo/model_simulator.py'], rootDir);

// 2. Node.js Backend in Demo Mode
startProcess('BACKEND', 'node', ['--env-file=backend/.env.demo', 'backend/server.mjs'], rootDir);

// 3. Angular Frontend
startProcess('FRONTEND', 'npx', ['ng', 'serve', '--port', '4200', '--no-progress'], path.join(rootDir, 'frontend'));

function cleanup() {
  console.log('\nShutting down all ACLyze AI demo services...');
  for (const { name, proc } of processes) {
    try {
      proc.kill();
    } catch (e) {
      // ignore
    }
  }
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
