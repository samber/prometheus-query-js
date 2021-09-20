
# Contributing

## 👷‍♂️ Build

```bash
npm run dev
```

NodeJS:

```bash
npm run example
```

In browser:

```bash
docker run --rm -it -p 8080:80 -v `pwd`:/usr/share/nginx/html nginx

# Then open http://localhost:8080/examples/browser
```

## ✅ Test

```sh
npm run test
```

## 🚀 Publish

Increment version number in `package.json`.

```bash
npm run build
npm publish
```

## Last thing...

Thanks for your contribution ;)
