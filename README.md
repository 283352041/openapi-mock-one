# OpenAPI Mock One

Start a tiny mock server from an OpenAPI JSON file.

```bash
node ./bin/openapi-mock-one.js ./examples/petstore.json --port 3333
curl http://localhost:3333/pets
```

The first version supports exact JSON paths and response examples.
