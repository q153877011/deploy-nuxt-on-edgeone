<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo">
        <NuxtLink to="/" class="logo-link">
          <span class="logo-text">Nuxt App</span>
        </NuxtLink>
      </div>
      
      <nav class="navigation">
        <ul class="nav-list">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">
              首页
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">
              关于
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/test-isr" class="nav-link" :class="{ active: $route.path === '/test-isr' }">
              ISR测试
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/test-ssr" class="nav-link" :class="{ active: $route.path === '/test-ssr' }">
              SSR测试
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  transition: opacity 0.3s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-text {
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navigation {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
  z-index: 1;
  pointer-events: none;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-link.active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background: white;
  border-radius: 1px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    padding: 0 15px;
    height: 56px;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
  
  .nav-list {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 10px 15px;
  }
  
  .navigation {
    margin-top: 10px;
  }
  
  .nav-list {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    padding: 0.3rem 0.6rem;
    font-size: 0.85rem;
  }
}
</style>