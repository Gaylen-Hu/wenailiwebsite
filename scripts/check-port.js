#!/usr/bin/env node
/*
 * 检查并清理占用指定端口的进程
 * 用法: node scripts/check-port.js [port]
 */

const { exec } = require('child_process');
const port = process.argv[2] || '3000';

console.log(`正在检查端口 ${port} 的占用情况...`);

// 根据操作系统选择不同的命令
const isWindows = process.platform === 'win32';
const command = isWindows
  ? `netstat -ano | findstr :${port}`
  : `lsof -ti:${port}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`端口 ${port} 未被占用`);
    return;
  }

  if (stdout.trim()) {
    console.log(`端口 ${port} 被以下进程占用:`);
    console.log(stdout);
    
    if (isWindows) {
      // Windows: 提取 PID 并提示如何终止
      const lines = stdout.trim().split('\n');
      const pids = new Set();
      lines.forEach(line => {
        const match = line.match(/\s+(\d+)\s*$/);
        if (match) {
          pids.add(match[1]);
        }
      });
      
      if (pids.size > 0) {
        console.log('\n要终止这些进程，请运行:');
        pids.forEach(pid => {
          console.log(`  taskkill /F /PID ${pid}`);
        });
        console.log('\n或者运行以下命令终止所有占用该端口的进程:');
        pids.forEach(pid => {
          console.log(`  taskkill /F /PID ${pid}`);
        });
      }
    } else {
      // Linux/Mac: 直接提供 kill 命令
      const pids = stdout.trim().split('\n').filter(pid => pid);
      console.log('\n要终止这些进程，请运行:');
      pids.forEach(pid => {
        console.log(`  kill -9 ${pid}`);
      });
      console.log('\n或者运行以下命令终止所有占用该端口的进程:');
      console.log(`  kill -9 ${pids.join(' ')}`);
    }
  } else {
    console.log(`端口 ${port} 未被占用`);
  }
});

