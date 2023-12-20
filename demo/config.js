// https://ec1f-2401-4900-1c80-28ee-e92a-826f-df8b-9c6b.ngrok-free.app/auth/callback
// https://ec1f-2401-4900-1c80-28ee-e92a-826f-df8b-9c6b.ngrok-free.app/auth/shopify/callback
// https://ec1f-2401-4900-1c80-28ee-e92a-826f-df8b-9c6b.ngrok-free.app/api/auth/callback

import express from "express";
const app = express();
// Shopify Connection
import "@shopify/shopify-api/adapters/node";
import { shopifyApi } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
const shopify = shopifyApi({
  apiKey: "564787232f953504bf617e4975ff5fc6",
  apiSecretKey: "53076a6fbaa0eaf81e75f738eb0a557f",
  hostName: "7c05-2401-4900-1c80-28ee-5120-787f-d0d6-5e47.ngrok-free.app",
  adminApiAccessToken: "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",
  isCustomStoreApp: true,
  restResources,
});
const session = shopify.session.customAppSession("milan-r-dev.myshopify.com");
const PORT = 80;

export { app, shopify, session, PORT }