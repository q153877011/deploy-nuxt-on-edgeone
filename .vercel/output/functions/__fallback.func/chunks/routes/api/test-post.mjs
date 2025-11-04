import { d as defineEventHandler, g as getMethod, b as getQuery, c as createError, r as readBody } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const mockPosts = [
  {
    id: 1,
    title: "Nuxt 4 \u65B0\u7279\u6027\u4ECB\u7ECD",
    content: "Nuxt 4 \u5E26\u6765\u4E86\u8BB8\u591A\u4EE4\u4EBA\u5174\u594B\u7684\u65B0\u7279\u6027\uFF0C\u5305\u62EC\u66F4\u597D\u7684\u6027\u80FD\u4F18\u5316\u548C\u5F00\u53D1\u4F53\u9A8C...",
    author: "\u5F20\u4E09",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    tags: ["nuxt", "vue", "\u524D\u7AEF"],
    status: "published"
  },
  {
    id: 2,
    title: "Vue 3 \u7EC4\u5408\u5F0FAPI\u6700\u4F73\u5B9E\u8DF5",
    content: "\u7EC4\u5408\u5F0FAPI\u662FVue 3\u7684\u6838\u5FC3\u7279\u6027\u4E4B\u4E00\uFF0C\u672C\u6587\u5C06\u4ECB\u7ECD\u5982\u4F55\u5728\u5B9E\u9645\u9879\u76EE\u4E2D\u6700\u4F73\u4F7F\u7528...",
    author: "\u674E\u56DB",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
    tags: ["vue", "composition-api", "\u6700\u4F73\u5B9E\u8DF5"],
    status: "published"
  },
  {
    id: 3,
    title: "\u73B0\u4EE3\u524D\u7AEF\u5F00\u53D1\u5DE5\u5177\u94FE",
    content: "\u63A2\u7D22\u73B0\u4EE3\u524D\u7AEF\u5F00\u53D1\u4E2D\u5FC5\u4E0D\u53EF\u5C11\u7684\u5DE5\u5177\u94FE\uFF0C\u4ECE\u6784\u5EFA\u5DE5\u5177\u5230\u90E8\u7F72\u7B56\u7565...",
    author: "\u738B\u4E94",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
    tags: ["\u5DE5\u5177\u94FE", "\u6784\u5EFA", "\u90E8\u7F72"],
    status: "draft"
  }
];
const testPost = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const query = getQuery(event);
  try {
    if (method === "GET") {
      if (query.id) {
        const postId = parseInt(query.id);
        const post = mockPosts.find((p) => p.id === postId);
        if (!post) {
          throw createError({
            statusCode: 404,
            statusMessage: "\u6587\u7AE0\u672A\u627E\u5230"
          });
        }
        return {
          success: true,
          data: post,
          message: "\u6587\u7AE0\u83B7\u53D6\u6210\u529F"
        };
      }
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const status = query.status || "all";
      const tag = query.tag;
      let filteredPosts = [...mockPosts];
      if (status !== "all") {
        filteredPosts = filteredPosts.filter((post) => post.status === status);
      }
      if (tag) {
        filteredPosts = filteredPosts.filter(
          (post) => post.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        );
      }
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
        message: "\u6587\u7AE0\u5217\u8868\u83B7\u53D6\u6210\u529F"
      };
    }
    if (method === "POST") {
      const body = await readBody(event);
      if (!body.title || !body.content) {
        throw createError({
          statusCode: 400,
          statusMessage: "\u6807\u9898\u548C\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A"
        });
      }
      const newPost = {
        id: Math.max(...mockPosts.map((p) => p.id)) + 1,
        title: body.title,
        content: body.content,
        author: body.author || "\u533F\u540D\u7528\u6237",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        tags: body.tags || [],
        status: body.status || "draft"
      };
      mockPosts.push(newPost);
      return {
        success: true,
        data: newPost,
        message: "\u6587\u7AE0\u521B\u5EFA\u6210\u529F"
      };
    }
    if (method === "PUT") {
      const body = await readBody(event);
      const postId = parseInt(query.id);
      if (!postId) {
        throw createError({
          statusCode: 400,
          statusMessage: "\u6587\u7AE0ID\u4E0D\u80FD\u4E3A\u7A7A"
        });
      }
      const postIndex = mockPosts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        throw createError({
          statusCode: 404,
          statusMessage: "\u6587\u7AE0\u672A\u627E\u5230"
        });
      }
      const updatedPost = {
        ...mockPosts[postIndex],
        ...body,
        id: postId,
        // 确保ID不被覆盖
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      mockPosts[postIndex] = updatedPost;
      return {
        success: true,
        data: updatedPost,
        message: "\u6587\u7AE0\u66F4\u65B0\u6210\u529F"
      };
    }
    if (method === "DELETE") {
      const postId = parseInt(query.id);
      if (!postId) {
        throw createError({
          statusCode: 400,
          statusMessage: "\u6587\u7AE0ID\u4E0D\u80FD\u4E3A\u7A7A"
        });
      }
      const postIndex = mockPosts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        throw createError({
          statusCode: 404,
          statusMessage: "\u6587\u7AE0\u672A\u627E\u5230"
        });
      }
      const deletedPost = mockPosts.splice(postIndex, 1)[0];
      return {
        success: true,
        data: deletedPost,
        message: "\u6587\u7AE0\u5220\u9664\u6210\u529F"
      };
    }
    throw createError({
      statusCode: 405,
      statusMessage: `\u4E0D\u652F\u6301\u7684HTTP\u65B9\u6CD5: ${method}`
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("API\u9519\u8BEF:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u670D\u52A1\u5668\u5185\u90E8\u9519\u8BEF"
    });
  }
});

export { testPost as default };
//# sourceMappingURL=test-post.mjs.map
