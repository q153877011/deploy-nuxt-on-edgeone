<template>
  <div class="tencentcloud-images">
    <div class="container">
      <h1 class="title">Tencent Cloud 图片展示</h1>
      <p class="description">以下展示 public/tencentcloud 目录下的三张图片</p>

      <div class="images-grid">
        <div
          v-for="(image, index) in images"
          :key="image.src"
          class="image-card"
        >
          <div class="image-wrapper">
            <img
              :src="image.src"
              :alt="image.alt"
              class="image"
              loading="lazy"
            />
          </div>
          <div class="image-info">
            <h3 class="image-title">{{ image.title }}</h3>
            <p class="image-filename">{{ image.filename }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const images = [
  {
    src: '/tencentcloud/1.png',
    alt: 'Tencent Cloud 图片 1',
    title: '图片 1',
    filename: '1.png'
  },
  {
    src: '/tencentcloud/2.png',
    alt: 'Tencent Cloud 图片 2',
    title: '图片 2',
    filename: '2.png'
  },
  {
    src: '/tencentcloud/3.png',
    alt: 'Tencent Cloud 图片 3',
    title: '图片 3',
    filename: '3.png'
  }
]
</script>

<style scoped>
.tencentcloud-images {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 16px;
}

.description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 40px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.image-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f5f5f5;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-info {
  padding: 20px;
}

.image-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.image-filename {
  font-size: 0.9rem;
  color: #666;
  font-family: monospace;
  margin: 0;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .images-grid {
    grid-template-columns: 1fr;
  }
}
</style>
