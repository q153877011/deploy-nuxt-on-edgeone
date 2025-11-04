<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo">
        <NuxtLink to="/" class="logo-link">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">Nuxt App</span>
        </NuxtLink>
      </div>
      
      <!-- 桌面端导航 -->
      <nav class="navigation" :class="{ 'mobile-open': mobileMenuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <NuxtLink 
              to="/" 
              class="nav-link" 
              :class="{ active: $route.path === '/' }"
              @click="closeMobileMenu"
            >
              <span class="nav-icon">🏠</span>
              <span>首页</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/about" 
              class="nav-link" 
              :class="{ active: $route.path === '/about' }"
              @click="closeMobileMenu"
            >
              <span class="nav-icon">ℹ️</span>
              <span>关于</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/stream" 
              class="nav-link" 
              :class="{ active: $route.path === '/stream' }"
              @click="closeMobileMenu"
            >
              <span class="nav-icon">📡</span>
              <span>流式传输</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/test-ssr" 
              class="nav-link" 
              :class="{ active: $route.path === '/test-ssr' }"
              @click="closeMobileMenu"
            >
              <span class="nav-icon">🔄</span>
              <span>SSR测试</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/test-ssg" 
              class="nav-link" 
              :class="{ active: $route.path === '/test-ssg' }"
              @click="closeMobileMenu"
            >
              <span class="nav-icon">📄</span>
              <span>SSG测试</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/test-isr" 
              class="nav-link" 
              :class="{ active: $route.path === '/test-isr' }"
              @click="closeMobileMenu"
            >
              <span class="nav-icon">⚙️</span>
              <span>ISR测试</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/cookies-ssr" 
              class="nav-link" 
              :class="{ active: $route.path === '/cookies-ssr' }"
              @click="closeMobileMenu"
            >
              <span class="nav-icon">🍪</span>
              <span>Cookies示例</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/auth" 
              class="nav-link" 
              :class="{ active: $route.path === '/auth' }"
              @click="closeMobileMenu"
            >
              <span class="nav-icon">🔐</span>
              <span>认证</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- 移动端菜单按钮 -->
      <button 
        class="mobile-menu-btn" 
        @click="toggleMobileMenu"
        :aria-label="mobileMenuOpen ? '关闭菜单' : '打开菜单'"
      >
        <span class="hamburger-line" :class="{ active: mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: mobileMenuOpen }"></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // 防止背景滚动
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// 点击外部区域关闭菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (mobileMenuOpen.value && !target.closest('.navigation') && !target.closest('.mobile-menu-btn')) {
    closeMobileMenu()
  }
}

// ESC 键关闭菜单
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e8ba3 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
}

.logo-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.logo-icon {
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.logo-text {
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
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
  gap: 4px;
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.nav-link.active {
  color: white;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, white, transparent);
  border-radius: 2px;
}

.nav-icon {
  font-size: 1.1rem;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hamburger-line {
  width: 28px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .nav-list {
    gap: 2px;
  }
  
  .nav-link {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
  
  .nav-icon {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 16px;
    height: 64px;
  }
  
  .logo-text {
    font-size: 1.3rem;
  }
  
  .logo-icon {
    font-size: 1.6rem;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .navigation {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
  }
  
  .navigation.mobile-open {
    max-height: 500px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-list {
    flex-direction: column;
    gap: 0;
    padding: 16px 0;
    align-items: stretch;
  }
  
  .nav-item {
    width: 100%;
  }
  
  .nav-link {
    padding: 16px 24px;
    border-radius: 0;
    justify-content: flex-start;
    width: 100%;
    font-size: 1rem;
  }
  
  .nav-link:hover {
    transform: translateX(8px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .nav-link.active {
    background: rgba(255, 255, 255, 0.2);
    border-left: 4px solid white;
    padding-left: 20px;
  }
  
  .nav-link.active::after {
    display: none;
  }
  
  .nav-icon {
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .header-container {
    height: 60px;
    padding: 0 12px;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .navigation {
    top: 60px;
  }
  
  .nav-link {
    padding: 14px 20px;
    font-size: 0.95rem;
  }
}
</style>