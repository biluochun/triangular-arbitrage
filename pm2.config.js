/**
 * Application configuration section
 * http://pm2.keymetrics.io/docs/usage/application-declaration/
 */
module.exports = {
  apps: [{
    name: 'ttttt',
    cwd: __dirname,
    script: `runner.js`,
    max_restarts: 100, // 重启次数
    exec_mode: 'fork',
    instances: 1, // 实例个数
    max_memory_restart: '100M',
    instance_var: 'NODE_APP_INSTANCE',
  }],
};
