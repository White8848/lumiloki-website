/**
 * 跨平台清理脚本 — 清理截图、构建产物、临时文件
 */

import { rmSync, existsSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PROJECT_ROOT = resolve(__dirname, '..')

let deleted = 0

function cleanDir(dir, label) {
  if (existsSync(dir)) {
    const count = countFiles(dir)
    rmSync(dir, { recursive: true, force: true })
    deleted += count
    console.log(`  ✓ 已清理${label}: ${dir} (${count} 个文件)`)
  } else {
    console.log(`  - ${label}不存在，跳过`)
  }
}

function countFiles(dir) {
  let count = 0
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile()) count++
      else if (entry.isDirectory()) count += countFiles(join(dir, entry.name))
    }
  } catch { /* ignore */ }
  return count
}

console.log('\n🧹 Lumiloki 清理工具\n')

// 1. 清理项目内截图目录
cleanDir(join(PROJECT_ROOT, 'screenshots'), '截图目录')

// 2. 清理构建产物
cleanDir(join(PROJECT_ROOT, 'dist'), '构建产物')

console.log(`\n  清理完成，共移除 ${deleted} 个文件\n`)
