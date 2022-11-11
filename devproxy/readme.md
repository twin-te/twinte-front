# 開発用 Proxy サーバ

開発用の Proxy サーバです。  
開発時に CORS の制限を回避するために使います。

## 使用方法

localhost:3000 で dev サーバを立てます。このとき `.env.development.local` などで `VITE_API_URL=http://localhost:4000/api/v3` を設定してください。

```bash
yarn dev
```

その後プロキシサーバを立てます

```bash
# Run this dev proxy
cd devproxy
docker build -t proxy-server .
docker run --net=host proxy-server
```
