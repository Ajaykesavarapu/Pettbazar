// PM2 Configuration for PettBazar API Server
// Usage: pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "pettbazar-api",
      script: "./artifacts/api-server/dist/index.mjs",
      cwd: __dirname,
      instances: "max", // Use all available CPU cores
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 8080,
      },
      // Restart policy
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 4000,
      // Logs
      error_file: "./logs/api-error.log",
      out_file: "./logs/api-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      // Graceful shutdown
      kill_timeout: 10000,
      listen_timeout: 8000,
      // Auto-restart on memory threshold
      max_memory_restart: "300M",
    },
  ],
};
