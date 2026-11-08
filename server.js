cconst express = require("express");
const app = express();

const challenge = {
  accepts: [
    {
      scheme: "exact",
      network: "eip155:8453",
      amount: "0.01",
      asset: "USDC",
      payTo: "0x39f0698cba45d9ce44c5a75c36d1d418f8f6a1be",
      maxTimeoutSeconds: 300,
      extra: {
        eip712Domain: {
          name: "Zayzay API",
          version: "1"
        }
      }
    }
  ]
};

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
          "x-payment-info": {
            scheme: "x402"
          },
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
        path: "/",
        accepts: challenge.accepts
      }
    ]
  });
});

app.get("/", (req, res) => {
  res.setHeader(
    "PAYMENT-REQUIRED",
    JSON.stringify(challenge)
  );

  res.status(402).json(challenge);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
