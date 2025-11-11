import swaggerJSDoc from "swagger-jsdoc";


export const swaggerSpec = swaggerJSDoc({
definition: {
openapi: "3.0.3",
info: {
title: "Influencer Content API – MVP",
version: "1.0.0",
description: "Quotes, captions, facts, hashtags ve günlük planlayıcı için basit API",
},
servers: [{ url: "http://localhost:3000" }],
},
apis: ["./src/routes/*.js"],
});