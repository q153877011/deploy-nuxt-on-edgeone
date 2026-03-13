import { d as defineEventHandler, g as getQuery, b as getMethod, c as getRequestURL } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const queryTest_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const method = getMethod(event);
  const url = getRequestURL(event);
  const analyzedParams = {};
  const typeAnalysis = {};
  for (const [key, value] of Object.entries(query)) {
    analyzedParams[key] = {
      original: value,
      type: typeof value
    };
    if (typeof value === "string") {
      if (!isNaN(value) && !isNaN(parseFloat(value))) {
        analyzedParams[key].asNumber = parseFloat(value);
        analyzedParams[key].possibleTypes = ["string", "number"];
      } else if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
        analyzedParams[key].asBoolean = value.toLowerCase() === "true";
        analyzedParams[key].possibleTypes = ["string", "boolean"];
      } else if (value.includes(",")) {
        analyzedParams[key].asArray = value.split(",").map((item) => item.trim());
        analyzedParams[key].possibleTypes = ["string", "array"];
      } else {
        analyzedParams[key].possibleTypes = ["string"];
      }
    }
    const detectedType = analyzedParams[key].possibleTypes[analyzedParams[key].possibleTypes.length - 1];
    typeAnalysis[detectedType] = (typeAnalysis[detectedType] || 0) + 1;
  }
  return {
    success: true,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    request: {
      method,
      url: url.toString(),
      pathname: url.pathname,
      search: url.search
    },
    query: {
      raw: query,
      count: Object.keys(query).length,
      analyzed: analyzedParams,
      typeStatistics: typeAnalysis
    },
    examples: {
      usage: [
        "?name=\u5F20\u4E09&age=25&active=true",
        "?tags=vue,nuxt,javascript&count=10",
        "?debug=false&limit=50&offset=0"
      ]
    }
  };
});

export { queryTest_get as default };
//# sourceMappingURL=query-test.get.mjs.map
