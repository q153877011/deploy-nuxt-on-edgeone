// 模拟文章数据
const mockPosts = [
  {
    id: 1,
    title: "Nuxt 4 新特性介绍",
    content: "Nuxt 4 带来了许多令人兴奋的新特性，包括更好的性能优化和开发体验...",
    author: "张三",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    tags: ["nuxt", "vue", "前端"],
    status: "published"
  },
  {
    id: 2,
    title: "Vue 3 组合式API最佳实践",
    content: "组合式API是Vue 3的核心特性之一，本文将介绍如何在实际项目中最佳使用...",
    author: "李四",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
    tags: ["vue", "composition-api", "最佳实践"],
    status: "published"
  },
  {
    id: 3,
    title: "现代前端开发工具链",
    content: "探索现代前端开发中必不可少的工具链，从构建工具到部署策略...",
    author: "王五",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
    tags: ["工具链", "构建", "部署"],
    status: "draft"
  }
];

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const query = getQuery(event);
  
  try {
    // GET 请求 - 获取文章数据
    if (method === 'GET') {
      // 如果有id参数，返回特定文章
      if (query.id) {
        const postId = parseInt(query.id);
        const post = mockPosts.find(p => p.id === postId);
        
        if (!post) {
          throw createError({
            statusCode: 404,
            statusMessage: '文章未找到'
          });
        }
        
        return {
          success: true,
          data: post,
          message: '文章获取成功'
        };
      }
      
      // 支持分页和筛选
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const status = query.status || 'all';
      const tag = query.tag;
      
      let filteredPosts = [...mockPosts];
      
      // 按状态筛选
      if (status !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.status === status);
      }
      
      // 按标签筛选
      if (tag) {
        filteredPosts = filteredPosts.filter(post => 
          post.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
        );
      }
      
      // 分页处理
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: {
          posts: paginatedPosts,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(filteredPosts.length / limit),
            totalPosts: filteredPosts.length,
            hasNext: endIndex < filteredPosts.length,
            hasPrev: page > 1
          }
        },
        message: '文章列表获取成功'
      };
    }
    
    // POST 请求 - 创建新文章
    if (method === 'POST') {
      const body = await readBody(event);
      
      // 验证必需字段
      if (!body.title || !body.content) {
        throw createError({
          statusCode: 400,
          statusMessage: '标题和内容不能为空'
        });
      }
      
      // 创建新文章对象
      const newPost = {
        id: Math.max(...mockPosts.map(p => p.id)) + 1,
        title: body.title,
        content: body.content,
        author: body.author || '匿名用户',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: body.tags || [],
        status: body.status || 'draft'
      };
      
      // 模拟保存到数据库
      mockPosts.push(newPost);
      
      return {
        success: true,
        data: newPost,
        message: '文章创建成功'
      };
    }
    
    // PUT 请求 - 更新文章
    if (method === 'PUT') {
      const body = await readBody(event);
      const postId = parseInt(query.id);
      
      if (!postId) {
        throw createError({
          statusCode: 400,
          statusMessage: '文章ID不能为空'
        });
      }
      
      const postIndex = mockPosts.findIndex(p => p.id === postId);
      if (postIndex === -1) {
        throw createError({
          statusCode: 404,
          statusMessage: '文章未找到'
        });
      }
      
      // 更新文章
      const updatedPost = {
        ...mockPosts[postIndex],
        ...body,
        id: postId, // 确保ID不被覆盖
        updatedAt: new Date().toISOString()
      };
      
      mockPosts[postIndex] = updatedPost;
      
      return {
        success: true,
        data: updatedPost,
        message: '文章更新成功'
      };
    }
    
    // DELETE 请求 - 删除文章
    if (method === 'DELETE') {
      const postId = parseInt(query.id);
      
      if (!postId) {
        throw createError({
          statusCode: 400,
          statusMessage: '文章ID不能为空'
        });
      }
      
      const postIndex = mockPosts.findIndex(p => p.id === postId);
      if (postIndex === -1) {
        throw createError({
          statusCode: 404,
          statusMessage: '文章未找到'
        });
      }
      
      const deletedPost = mockPosts.splice(postIndex, 1)[0];
      
      return {
        success: true,
        data: deletedPost,
        message: '文章删除成功'
      };
    }
    
    // 不支持的HTTP方法
    throw createError({
      statusCode: 405,
      statusMessage: `不支持的HTTP方法: ${method}`
    });
    
  } catch (error) {
    // 如果是已知错误，直接抛出
    if (error.statusCode) {
      throw error;
    }
    
    // 未知错误的处理
    console.error('API错误:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '服务器内部错误'
    });
  }
});
