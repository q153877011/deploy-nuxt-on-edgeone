import fs from 'fs';
import path from 'path';

// 文件复制配置
const filesToCopy = [
  {
    source: '.edgeone-backup/meta.json',
    destination: '.edgeone/meta.json'
  },
  {
    source: '.edgeone-backup/server-handler/index.mjs',
    destination: '.edgeone/server-handler/index.mjs'
  }
];

// 确保目标目录存在
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`创建目录: ${dirPath}`);
  }
}

// 复制文件
function copyFile(source, destination) {
  if (!fs.existsSync(source)) {
    console.error(`❌ 源文件不存在: ${source}`);
    return;
  }
  
  try {
    ensureDirectoryExists(path.dirname(destination));
    fs.copyFileSync(source, destination);
    console.log(`✅ 成功复制: ${source} -> ${destination}`);
  } catch (error) {
    console.error(`❌ 复制失败: ${source} -> ${destination}`);
    console.error(`错误信息: ${error.message}`);
  }
}

// 主要操作
function main() {
  console.log('开始文件复制操作...\n');
  
  filesToCopy.forEach(({ source, destination }) => {
    copyFile(source, destination);
  });
  
  console.log('\n文件复制操作完成！');
}

// 运行脚本
main();

export { copyFile, ensureDirectoryExists, main };