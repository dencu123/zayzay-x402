const express = require("express");
const app = express();

app.get("/openapi.json", (req, res) => {
  res.json({
    openapi: "3.0.0",
    info: {
      title: "Zayzay API",
      version: "1.0.0"
    },
    paths: {
      "/": {
        get: {
          responses: {
            "402": {
              description: "Payment Required"
            }
          }
        }
      }
    }
  });
});

app.get("/.well-known/x402", (req, res) => {
  res.json({
    version: 1,
    resources: [
      {
        path: "/"
      }
    ]
  });
});

app.get("/", (req, res) => {
  const challenge = {
    accepts: [
      {
        scheme: "exact",
        network: "eip155:8453",
        amount: "0.01",
        asset: "USDC",
        payTo: "GANTI_DENGAN_WALLET_BASE_KAMU",
        maxTimeoutSeconds: 300
      }
    ]
  };

  res.setHeader(
    "PAYMENT-REQUIRED",
    JSON.stringify(challenge)
  );

  res.status(402).json(challenge);
});

app.listen(process.env.PORT || 3000);
