<script setup lang="ts">
// 如果自动导入不工作，添加这行：
import { useRoute } from 'vue-router'

const route = useRoute()

// 访问 /posts/1 时，route.params.id 的值为 1
console.log(route.params.id)
</script>

<template>
  <div class="container">
    <div class="post-card">
      <h1 class="title">📄 文章详情页</h1>
      
      <div class="route-info">
        <h2>🛣️ 路由信息</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">文章ID:</span>
            <span class="value">{{ route.params.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">完整路径:</span>
            <span class="value">{{ route.fullPath }}</span>
          </div>
          <div class="info-item">
            <span class="label">路由名称:</span>
            <span class="value">{{ route.name || '未命名' }}</span>
          </div>
          <div class="info-item">
            <span class="label">查询参数:</span>
            <span class="value">{{ Object.keys(route.query).length ? JSON.stringify(route.query) : '无' }}</span>
          </div>
        </div>
      </div>

      <div class="content-preview">
        <h2>📝 文章内容预览</h2>
        <p class="preview-text">
          这里是文章 ID <strong>{{ route.params.id }}</strong> 的内容预览。
          <br>
          在实际应用中，您可以根据这个ID从API获取具体的文章数据。
        </p>
      </div>

      <div class="actions">
        <button @click="$router.back()" class="btn btn-secondary">← 返回</button>
        <button @click="$router.push('/')" class="btn btn-primary">🏠 首页</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.post-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border: 1px solid #e5e7eb;
}

.title {
  color: #1f2937;
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
}

.route-info {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.route-info h2 {
  color: #374151;
  margin-bottom: 15px;
  font-size: 1.25rem;
}

.info-grid {
  display: grid;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  font-weight: 600;
  color: #6b7280;
  min-width: 100px;
}

.value {
  color: #1f2937;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
}

.content-preview {
  margin-bottom: 30px;
  padding: 20px;
  background: #fefce8;
  border-radius: 8px;
  border-left: 4px solid #eab308;
}

.content-preview h2 {
  color: #374151;
  margin-bottom: 15px;
  font-size: 1.25rem;
}

.preview-text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .container {
    padding: 10px;
  }
  
  .post-card {
    padding: 20px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>