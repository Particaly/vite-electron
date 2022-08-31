## vite-electron

### **[English](README.md) | 简体中文**

#### 用法

```nodejs
npm install     // 国内使用可运行 `npm run install-env` 来安装依赖.
npm run dev
```

#### 描述

这是个使用`vite`的`electron`项目.
运行 `app` 时，`api` 会自动导出到 `commonapi.ts` 并注册到 `preload.js` 中。

#### 目录结构

```tree
├── dist                            将按照 packages 目录的结构生成
|   ├── main
|   ├── preload
|   └── renderer
|
├── bin
|   ├── install-environment.js      安装模块 -> npm run install-env
|   ├── build.mjs                   构建脚本    -> npm run build
|   └── watch.mjs                   开发脚本  -> npm run dev
|
├── packages
|   ├── common                      这些文件将被渲染进程和主进程使用
|   |   └── api.ts                  该文件在应用程序运行时自动写入
|   ├── main                        Main-process 源代码
|   |   └── vite.config.ts
|   ├── preload                     Preload-script 源代码
|   |   └── vite.config.ts
|   └── renderer                    Renderer-process 源代码
|       └── vite.config.ts
```

#### 注意事项

- `host`和`port`在 `package.json` 中配置
