## vite-electron

### **English | [简体中文](README.zh-CN.md)**

#### Usage

```nodejs
npm install     // if you were in china, use `npm run install-env` instead.
npm run dev
```

#### Behavior

This is a demo of use vite in electron.
The api will be automatically exported to `/common/api.ts` and registered in `preload.js` when run app.

#### Structure

```tree
├── dist                            Will be generated following the structure of "packages" directory
|   ├── main
|   ├── preload
|   └── renderer
|
├── bin
|   ├── install-environment.js      Install modules -> npm run install-env
|   ├── build.mjs                   Build script    -> npm run build
|   └── watch.mjs                   Develop script  -> npm run dev
|
├── packages
|   ├── common                      The files will used by both of render process and main process
|   |   └── api.ts                  This file is automatically written when the app is running
|   ├── main                        Main-process source code
|   |   └── vite.config.ts
|   ├── preload                     Preload-script source code
|   |   └── vite.config.ts
|   └── renderer                    Renderer-process source code
|       └── vite.config.ts
```

#### Precautions

The host and port are configured in `package.json`
