import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const env = defineEventHandler(async (event) => {
  const sensitiveKeywords = ["password", "secret", "key", "token", "api_key", "private", "credential"];
  const isSensitiveKey = (key) => {
    return sensitiveKeywords.some(
      (keyword) => key.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  const envVars = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (!key) continue;
    envVars[key] = isSensitiveKey(key) ? "***HIDDEN***" : value;
  }
  return {
    success: true,
    message: "\u73AF\u5883\u53D8\u91CF\u8BFB\u53D6\u6210\u529F",
    processEnv: envVars,
    // 统计信息
    stats: {
      totalEnvVars: Object.keys(process.env).length,
      sensitiveCount: Object.keys(process.env).filter(
        (key) => isSensitiveKey(key)
      ).length
    },
    // 运行环境信息
    runtime: {
      nodeEnv: "production",
      platform: process.platform,
      nodeVersion: process.version,
      cwd: process.cwd()
    }
  };
});

export { env as default };
//# sourceMappingURL=env.mjs.map
