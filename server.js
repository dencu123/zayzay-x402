
import express from "express";
import {
  paymentMiddleware
} from "@x402/express";

import {
  x402ResourceServer,
  HTTPFacilitatorClient
} from "@x402/core/server";

import {
  registerExactEvmScheme
} from "@x402/evm/exact/server";

const app = express();

const PORT = process.env.PORT || 3000;

const PAY_TO =
  "0x39f0698cba45d9ce44c5a75c36d1d418f8f6a1be";

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://api.cdp.coinbase.com/platform/v2/x402"
});

const server = new x402ResourceServer(facilitatorClient);

registerExactEvmScheme(server);

const routes = {
  "GET /": {
    price: "$0.01",
    network: "eip155:8453",
    payTo: PAY_TO,
    description: "Zayzay API paid endpoint",
    mimeType: "application/json",
    extensions: {
      bazaar: {
        discoverable: true,
        inputSchema: {
          queryParams: {}
        },
        outputSchema: {
          type: "object",
          properties: {
            success: {
              type: "boolean"
            },
            message: {
              type: "string"
            }
          }
        }
      }
    }
  }
};

app.use(paymentMiddleware(routes, server));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Zayzay API"
  });
});

app.listen(PORT, () => {
  console.log(`Zayzay API running on port ${PORT}`);
});
