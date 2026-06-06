#!/usr/bin/env node
import fs from "node:fs";
import http from "node:http";
if (process.argv.includes("--help")) { console.log("Usage: openapi-mock-one openapi.json [--port 3333]"); process.exit(0); }
const file = process.argv[2];
const port = Number(process.argv[process.argv.indexOf("--port")+1]) || 3333;
if (!file) throw new Error("Missing OpenAPI JSON file");
const spec = JSON.parse(fs.readFileSync(file, "utf8"));
const routes = Object.entries(spec.paths || {}).flatMap(([p, methods]) => Object.keys(methods).map(m => ({ path: p, method: m.toUpperCase(), op: methods[m] })));
function sample(op){const s=op.responses?.["200"]?.content?.["application/json"]?.example; return s ?? { ok:true, operation: op.operationId || "mock" };}
http.createServer((req,res)=>{const route=routes.find(r=>r.method===req.method && r.path===req.url); if(!route){res.writeHead(404);res.end(JSON.stringify({error:"not mocked"}));return}res.setHeader("content-type","application/json");res.end(JSON.stringify(sample(route.op),null,2));}).listen(port,()=>console.log(`Mock server listening on http://localhost:${port}`));
