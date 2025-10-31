<template>
  <div class="app-layout">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <footer class="app-footer">
      <div class="footer-container">
        <p>&copy; 2024 Nuxt App. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 64px - 80px); /* 减去header和footer的高度 */
}

.app-footer {
  background: #2c3e50;
  color: white;
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.footer-container p {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

/* 全局样式重置 */
:global(body) {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

:global(*) {
  box-sizing: border-box;
}

:global(a) {
  color: inherit;
  text-decoration: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem 0;
    min-height: calc(100vh - 56px - 70px);
  }
  
  .app-footer {
    padding: 1rem 0;
  }
  
  .footer-container {
    padding: 0 15px;
  }
  
  .footer-container p {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem 0;
  }
  
  .footer-container p {
    font-size: 0.75rem;
  }
}
</style>