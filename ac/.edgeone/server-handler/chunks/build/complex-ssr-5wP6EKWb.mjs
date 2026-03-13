import { ref, withAsyncContext, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-ClZhNorM.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'node:http';
import 'node:https';
import '../nitro/nitro.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = {
  __name: "complex-ssr",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const performanceMetrics = ref(null);
    async function processComplexData() {
      const startTime = performance.now();
      const fetchStartTime = performance.now();
      try {
        const [postsResponse, timeResponse, envResponse] = await Promise.all([
          $fetch("/api/test-post?limit=100").catch(() => ({ success: false, data: { posts: [] } })),
          $fetch("/api/time").catch(() => ({ localTime: "", timestamp: 0 })),
          $fetch("/api/env").catch(() => ({ success: false, processEnv: {}, stats: { totalEnvVars: 0 } }))
        ]);
        const fetchTime = performance.now() - fetchStartTime;
        const processStartTime = performance.now();
        const posts = postsResponse?.data?.posts || postsResponse?.posts || [];
        const timeData = timeResponse || {};
        const envData = envResponse || {};
        const userRecords = generateUserRecords(500);
        const orderRecords = generateOrderRecords(800, userRecords);
        const transactionRecords = generateTransactionRecords(1e3, userRecords, orderRecords);
        const transformedUsers = transformUserData(userRecords);
        const transformedOrders = transformOrderData(orderRecords);
        const transformedTransactions = transformTransactionData(transactionRecords);
        const userStats = calculateUserStatistics(transformedUsers);
        const orderStats = calculateOrderStatistics(transformedOrders);
        const transactionStats = calculateTransactionStatistics(transformedTransactions);
        const tagAnalysis = analyzeTags(posts);
        const timeSeriesAnalysis = analyzeTimeSeries(orderRecords);
        const correlationAnalysis = analyzeCorrelations(userRecords, orderRecords);
        const sortedUsers = sortUsersByPoints(transformedUsers);
        const filteredOrders = filterOrdersByAmount(transformedOrders, 100);
        const processTime = performance.now() - processStartTime;
        const totalTime = performance.now() - startTime;
        return {
          sourceStats: {
            posts: {
              total: posts.length,
              published: posts.filter((p) => p.status === "published").length,
              drafts: posts.filter((p) => p.status === "draft").length
            },
            time: {
              timezone: timeData.timezone || "N/A",
              timestamp: timeData.timestamp || 0
            },
            env: {
              totalVars: envData.stats?.totalEnvVars || 0,
              platform: envData.runtime?.platform || "N/A"
            }
          },
          aggregatedData: {
            userRecords: transformedUsers,
            orderRecords: transformedOrders,
            transactionRecords: transformedTransactions,
            totalRecords: transformedUsers.length + transformedOrders.length + transformedTransactions.length
          },
          statistics: {
            users: userStats,
            orders: orderStats,
            transactions: transactionStats
          },
          tagAnalysis,
          timeSeriesAnalysis,
          correlationAnalysis,
          performanceMetrics: {
            totalTime: Math.round(totalTime),
            fetchTime: Math.round(fetchTime),
            processTime: Math.round(processTime),
            recordsGenerated: transformedUsers.length + transformedOrders.length + transformedTransactions.length
          }
        };
      } catch (error2) {
        console.error("数据处理错误:", error2);
        throw error2;
      }
    }
    function generateUserRecords(count) {
      const users = [];
      const names = ["张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十"];
      const cities = ["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉", "西安"];
      for (let i = 1; i <= count; i++) {
        users.push({
          userId: `user_${i}`,
          name: `${names[i % names.length]}${Math.floor(i / names.length) + 1}`,
          age: 18 + Math.floor(Math.random() * 50),
          city: cities[Math.floor(Math.random() * cities.length)],
          points: Math.floor(Math.random() * 1e4),
          isVip: Math.random() > 0.7,
          isActive: Math.random() > 0.3,
          joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
        });
      }
      return users;
    }
    function generateOrderRecords(count, users) {
      const orders = [];
      const statuses = ["pending", "processing", "completed", "cancelled"];
      for (let i = 1; i <= count; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const amount = Math.floor(Math.random() * 5e3) + 10;
        const date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
        orders.push({
          orderId: `order_${i}`,
          userId: user.userId,
          amount,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          createdAt: date.toISOString(),
          items: Math.floor(Math.random() * 10) + 1
        });
      }
      return orders;
    }
    function generateTransactionRecords(count, users, orders) {
      const transactions = [];
      const types = ["payment", "refund", "transfer"];
      for (let i = 1; i <= count; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const order = orders[Math.floor(Math.random() * orders.length)];
        const success = Math.random() > 0.15;
        transactions.push({
          transactionId: `txn_${i}`,
          userId: user.userId,
          orderId: order.orderId,
          type: types[Math.floor(Math.random() * types.length)],
          amount: Math.floor(Math.random() * 3e3) + 5,
          success,
          createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
        });
      }
      return transactions;
    }
    function transformUserData(users) {
      return users.map((user) => ({
        ...user,
        level: user.points > 5e3 ? "高级" : user.points > 2e3 ? "中级" : "初级",
        displayName: `${user.name} (${user.city})`,
        score: user.points * (user.isVip ? 1.5 : 1) * (user.isActive ? 1.2 : 1)
      }));
    }
    function transformOrderData(orders) {
      return orders.map((order) => ({
        ...order,
        formattedAmount: `¥${order.amount.toLocaleString()}`,
        statusText: {
          pending: "待处理",
          processing: "处理中",
          completed: "已完成",
          cancelled: "已取消"
        }[order.status] || order.status,
        isHighValue: order.amount > 1e3
      }));
    }
    function transformTransactionData(transactions) {
      return transactions.map((txn) => ({
        ...txn,
        formattedAmount: `¥${txn.amount.toLocaleString()}`,
        statusText: txn.success ? "成功" : "失败",
        typeText: {
          payment: "支付",
          refund: "退款",
          transfer: "转账"
        }[txn.type] || txn.type
      }));
    }
    function calculateUserStatistics(users) {
      const active = users.filter((u) => u.isActive).length;
      const vip = users.filter((u) => u.isVip).length;
      const totalAge = users.reduce((sum, u) => sum + u.age, 0);
      const totalPoints = users.reduce((sum, u) => sum + u.points, 0);
      return {
        active,
        vip,
        avgAge: Math.round(totalAge / users.length),
        totalPoints: totalPoints.toLocaleString()
      };
    }
    function calculateOrderStatistics(orders) {
      const completed = orders.filter((o) => o.status === "completed").length;
      const totalAmount = orders.reduce((sum, o) => sum + o.amount, 0);
      return {
        total: orders.length,
        completed,
        totalAmount: Math.round(totalAmount),
        avgAmount: totalAmount / orders.length
      };
    }
    function calculateTransactionStatistics(transactions) {
      const success = transactions.filter((t) => t.success).length;
      const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
      return {
        total: transactions.length,
        success,
        totalAmount: Math.round(totalAmount),
        successRate: Math.round(success / transactions.length * 100)
      };
    }
    function analyzeTags(posts) {
      const tagCount = {};
      posts.forEach((post) => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach((tag) => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          });
        }
      });
      const topTags = Object.entries(tagCount).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);
      return { topTags };
    }
    function analyzeTimeSeries(orders) {
      const dailyOrders = {};
      orders.forEach((order) => {
        const date = new Date(order.createdAt).toISOString().split("T")[0];
        if (!dailyOrders[date]) {
          dailyOrders[date] = { date, count: 0, amount: 0 };
        }
        dailyOrders[date].count++;
        dailyOrders[date].amount += order.amount;
      });
      return {
        dailyOrders: Object.values(dailyOrders).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 30)
        // 只显示最近30天
      };
    }
    function analyzeCorrelations(users, orders) {
      const userOrderCount = {};
      orders.forEach((order) => {
        userOrderCount[order.userId] = (userOrderCount[order.userId] || 0) + 1;
      });
      const orderCounts = Object.values(userOrderCount);
      const totalOrders = orderCounts.reduce((sum, count) => sum + count, 0);
      const avgOrdersPerUser = totalOrders / users.length;
      const maxOrders = Math.max(...orderCounts);
      const maxUserId = Object.keys(userOrderCount).find(
        (userId) => userOrderCount[userId] === maxOrders
      );
      const distribution = {
        "0单": 0,
        "1-5单": 0,
        "6-10单": 0,
        "11-20单": 0,
        "20+单": 0
      };
      users.forEach((user) => {
        const count = userOrderCount[user.userId] || 0;
        if (count === 0) distribution["0单"]++;
        else if (count <= 5) distribution["1-5单"]++;
        else if (count <= 10) distribution["6-10单"]++;
        else if (count <= 20) distribution["11-20单"]++;
        else distribution["20+单"]++;
      });
      return {
        avgOrdersPerUser,
        maxOrdersUser: {
          userId: maxUserId,
          orderCount: maxOrders
        },
        orderDistribution: Object.entries(distribution).map(([range, count]) => ({ range, count }))
      };
    }
    function sortUsersByPoints(users) {
      return [...users].sort((a, b) => b.points - a.points);
    }
    function filterOrdersByAmount(orders, minAmount) {
      return orders.filter((o) => o.amount >= minAmount);
    }
    const { data: processedData, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "complex-ssr-data",
      processComplexData,
      {
        server: true,
        // 确保在服务器端执行
        default: () => null
      }
    )), __temp = await __temp, __restore(), __temp);
    watch(processedData, (newData) => {
      if (newData?.performanceMetrics) {
        performanceMetrics.value = newData.performanceMetrics;
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ style: { "padding": "24px", "max-width": "1200px", "margin": "0 auto" } }, _attrs))} data-v-e016521a><h1 data-v-e016521a>复杂SSR性能测试页面</h1><p style="${ssrRenderStyle({ "color": "#666", "margin-bottom": "24px" })}" data-v-e016521a> 此页面包含复杂的数据处理逻辑，用于测试Vercel SSR性能 </p>`);
      if (unref(performanceMetrics)) {
        _push(`<div style="${ssrRenderStyle({ "background": "#f5f5f5", "padding": "16px", "border-radius": "8px", "margin-bottom": "24px" })}" data-v-e016521a><h2 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-e016521a>性能指标</h2><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))", "gap": "12px" })}" data-v-e016521a><div data-v-e016521a><strong data-v-e016521a>总处理时间：</strong>${ssrInterpolate(unref(performanceMetrics).totalTime)}ms </div><div data-v-e016521a><strong data-v-e016521a>数据获取时间：</strong>${ssrInterpolate(unref(performanceMetrics).fetchTime)}ms </div><div data-v-e016521a><strong data-v-e016521a>数据处理时间：</strong>${ssrInterpolate(unref(performanceMetrics).processTime)}ms </div><div data-v-e016521a><strong data-v-e016521a>生成记录数：</strong>${ssrInterpolate(unref(performanceMetrics).recordsGenerated)}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pending)) {
        _push(`<div style="${ssrRenderStyle({ "text-align": "center", "padding": "40px" })}" data-v-e016521a><p data-v-e016521a>正在执行复杂的数据处理逻辑...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div style="${ssrRenderStyle({ "background": "#fee", "padding": "16px", "border-radius": "8px", "color": "#c33" })}" data-v-e016521a><strong data-v-e016521a>错误：</strong>${ssrInterpolate(unref(error).message)}</div>`);
      } else if (unref(processedData)) {
        _push(`<div data-v-e016521a><div style="${ssrRenderStyle({ "margin-bottom": "24px" })}" data-v-e016521a><h2 data-v-e016521a>数据源统计</h2><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))", "gap": "16px" })}" data-v-e016521a><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><h3 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-e016521a>文章数据</h3><p data-v-e016521a>总数：${ssrInterpolate(unref(processedData).sourceStats.posts.total)}</p><p data-v-e016521a>已发布：${ssrInterpolate(unref(processedData).sourceStats.posts.published)}</p><p data-v-e016521a>草稿：${ssrInterpolate(unref(processedData).sourceStats.posts.drafts)}</p></div><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><h3 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-e016521a>时间数据</h3><p data-v-e016521a>时区：${ssrInterpolate(unref(processedData).sourceStats.time.timezone)}</p><p data-v-e016521a>时间戳：${ssrInterpolate(unref(processedData).sourceStats.time.timestamp)}</p></div><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><h3 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-e016521a>环境信息</h3><p data-v-e016521a>环境变量数：${ssrInterpolate(unref(processedData).sourceStats.env.totalVars)}</p><p data-v-e016521a>平台：${ssrInterpolate(unref(processedData).sourceStats.env.platform)}</p></div></div></div><div style="${ssrRenderStyle({ "margin-bottom": "24px" })}" data-v-e016521a><h2 data-v-e016521a>数据聚合结果</h2><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><p data-v-e016521a><strong data-v-e016521a>生成的用户记录数：</strong>${ssrInterpolate(unref(processedData).aggregatedData.userRecords.length)}</p><p data-v-e016521a><strong data-v-e016521a>生成的订单记录数：</strong>${ssrInterpolate(unref(processedData).aggregatedData.orderRecords.length)}</p><p data-v-e016521a><strong data-v-e016521a>生成的交易记录数：</strong>${ssrInterpolate(unref(processedData).aggregatedData.transactionRecords.length)}</p><p data-v-e016521a><strong data-v-e016521a>总数据量：</strong>${ssrInterpolate(unref(processedData).aggregatedData.totalRecords)} 条</p></div></div><div style="${ssrRenderStyle({ "margin-bottom": "24px" })}" data-v-e016521a><h2 data-v-e016521a>统计分析</h2><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))", "gap": "16px" })}" data-v-e016521a><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><h3 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-e016521a>用户统计</h3><ul style="${ssrRenderStyle({ "list-style": "none", "padding": "0" })}" data-v-e016521a><li data-v-e016521a>活跃用户：${ssrInterpolate(unref(processedData).statistics.users.active)}</li><li data-v-e016521a>VIP用户：${ssrInterpolate(unref(processedData).statistics.users.vip)}</li><li data-v-e016521a>平均年龄：${ssrInterpolate(unref(processedData).statistics.users.avgAge)}</li><li data-v-e016521a>总积分：${ssrInterpolate(unref(processedData).statistics.users.totalPoints)}</li></ul></div><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><h3 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-e016521a>订单统计</h3><ul style="${ssrRenderStyle({ "list-style": "none", "padding": "0" })}" data-v-e016521a><li data-v-e016521a>总订单数：${ssrInterpolate(unref(processedData).statistics.orders.total)}</li><li data-v-e016521a>已完成：${ssrInterpolate(unref(processedData).statistics.orders.completed)}</li><li data-v-e016521a>总金额：¥${ssrInterpolate(unref(processedData).statistics.orders.totalAmount.toLocaleString())}</li><li data-v-e016521a>平均金额：¥${ssrInterpolate(unref(processedData).statistics.orders.avgAmount.toFixed(2))}</li></ul></div><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><h3 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-e016521a>交易统计</h3><ul style="${ssrRenderStyle({ "list-style": "none", "padding": "0" })}" data-v-e016521a><li data-v-e016521a>总交易数：${ssrInterpolate(unref(processedData).statistics.transactions.total)}</li><li data-v-e016521a>成功交易：${ssrInterpolate(unref(processedData).statistics.transactions.success)}</li><li data-v-e016521a>总交易额：¥${ssrInterpolate(unref(processedData).statistics.transactions.totalAmount.toLocaleString())}</li><li data-v-e016521a>成功率：${ssrInterpolate(unref(processedData).statistics.transactions.successRate)}%</li></ul></div></div></div><div style="${ssrRenderStyle({ "margin-bottom": "24px" })}" data-v-e016521a><h2 data-v-e016521a>标签分析</h2><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><p data-v-e016521a><strong data-v-e016521a>热门标签（Top 10）：</strong></p><div style="${ssrRenderStyle({ "display": "flex", "flex-wrap": "wrap", "gap": "8px", "margin-top": "8px" })}" data-v-e016521a><!--[-->`);
        ssrRenderList(unref(processedData).tagAnalysis.topTags, (tag) => {
          _push(`<span style="${ssrRenderStyle({ "background": "#e3f2fd", "padding": "4px 12px", "border-radius": "16px", "font-size": "14px" })}" data-v-e016521a>${ssrInterpolate(tag.name)} (${ssrInterpolate(tag.count)}) </span>`);
        });
        _push(`<!--]--></div></div></div><div style="${ssrRenderStyle({ "margin-bottom": "24px" })}" data-v-e016521a><h2 data-v-e016521a>时间序列分析</h2><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><p data-v-e016521a><strong data-v-e016521a>按日期分组的订单数：</strong></p><div style="${ssrRenderStyle({ "max-height": "300px", "overflow-y": "auto", "margin-top": "8px" })}" data-v-e016521a><table style="${ssrRenderStyle({ "width": "100%", "border-collapse": "collapse" })}" data-v-e016521a><thead data-v-e016521a><tr style="${ssrRenderStyle({ "background": "#f5f5f5" })}" data-v-e016521a><th style="${ssrRenderStyle({ "padding": "8px", "text-align": "left", "border-bottom": "2px solid #ddd" })}" data-v-e016521a>日期</th><th style="${ssrRenderStyle({ "padding": "8px", "text-align": "right", "border-bottom": "2px solid #ddd" })}" data-v-e016521a>订单数</th><th style="${ssrRenderStyle({ "padding": "8px", "text-align": "right", "border-bottom": "2px solid #ddd" })}" data-v-e016521a>总金额</th></tr></thead><tbody data-v-e016521a><!--[-->`);
        ssrRenderList(unref(processedData).timeSeriesAnalysis.dailyOrders, (item, index) => {
          _push(`<tr data-v-e016521a><td style="${ssrRenderStyle({ "padding": "8px", "border-bottom": "1px solid #eee" })}" data-v-e016521a>${ssrInterpolate(item.date)}</td><td style="${ssrRenderStyle({ "padding": "8px", "text-align": "right", "border-bottom": "1px solid #eee" })}" data-v-e016521a>${ssrInterpolate(item.count)}</td><td style="${ssrRenderStyle({ "padding": "8px", "text-align": "right", "border-bottom": "1px solid #eee" })}" data-v-e016521a>¥${ssrInterpolate(item.amount.toLocaleString())}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div></div><div style="${ssrRenderStyle({ "margin-bottom": "24px" })}" data-v-e016521a><h2 data-v-e016521a>数据关联分析</h2><div style="${ssrRenderStyle({ "background": "white", "padding": "16px", "border-radius": "8px", "box-shadow": "0 2px 4px rgba(0,0,0,0.1)" })}" data-v-e016521a><p data-v-e016521a><strong data-v-e016521a>用户-订单关联统计：</strong></p><p data-v-e016521a>平均每个用户订单数：${ssrInterpolate(unref(processedData).correlationAnalysis.avgOrdersPerUser.toFixed(2))}</p><p data-v-e016521a>最高订单数用户：${ssrInterpolate(unref(processedData).correlationAnalysis.maxOrdersUser.userId)} (${ssrInterpolate(unref(processedData).correlationAnalysis.maxOrdersUser.orderCount)} 单)</p><p data-v-e016521a>用户订单分布：</p><ul style="${ssrRenderStyle({ "list-style": "none", "padding": "0" })}" data-v-e016521a><!--[-->`);
        ssrRenderList(unref(processedData).correlationAnalysis.orderDistribution, (dist, index) => {
          _push(`<li data-v-e016521a>${ssrInterpolate(dist.range)}：${ssrInterpolate(dist.count)} 用户 </li>`);
        });
        _push(`<!--]--></ul></div></div><div style="${ssrRenderStyle({ "text-align": "center", "margin-top": "24px" })}" data-v-e016521a><button${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""} style="${ssrRenderStyle({ "padding": "12px 24px", "background": "#007bff", "color": "white", "border": "none", "border-radius": "6px", "cursor": "pointer", "font-size": "16px" })}" data-v-e016521a>${ssrInterpolate(unref(pending) ? "处理中..." : "重新处理数据")}</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/complex-ssr.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const complexSsr = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e016521a"]]);

export { complexSsr as default };
//# sourceMappingURL=complex-ssr-5wP6EKWb.mjs.map
