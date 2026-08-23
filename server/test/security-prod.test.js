import test from "node:test";
import assert from "node:assert";
import http from "node:http";

// Set NODE_ENV to production before importing app
process.env.NODE_ENV = "production";
process.env.NO_SERVER_LISTEN = "true";
process.env.STREAM_SECRET = "test-production-secret-voiceforge";
const { default: app } = await import("../index.js?env=prod_" + Date.now());

function makeRequest(path, method = "GET") {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, () => {
      const port = server.address().port;
      const req = http.request(
        {
          hostname: "localhost",
          port,
          path,
          method,
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            server.close();
            resolve({ res, data });
          });
        }
      );
      req.on("error", (err) => {
        server.close();
        reject(err);
      });
      req.end();
    });
  });
}

test("Security Headers (Integration) - Production environment", async () => {
  const savedEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    const { res } = await makeRequest("/api/health");
    assert.strictEqual(res.statusCode, 200);

    const csp = res.headers["content-security-policy"];
    assert.ok(csp, "Content-Security-Policy header should be present");
    assert.ok(csp.includes("default-src"));
    assert.ok(csp.includes("script-src"));
    assert.ok(csp.includes("worker-src"));
  } finally {
    process.env.NODE_ENV = savedEnv;
  }
});
