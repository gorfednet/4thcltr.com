# 4th Culture

Design practice site for [4th Culture](https://4thcltr.com) — Michael Duncan McArthur.

## Stack

Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · React Router 8

## Develop

```bash
npm install
npm run dev
```

## Build and deploy

```bash
cp .deploy-env.example .deploy-env   # if needed
make deploy                          # builds then rsyncs dist/ to SMB
```

See [DEPLOY.md](./DEPLOY.md) for nginx/SSL notes.
