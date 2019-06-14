# Terjoy Pay System Release Note

支付系统发布记录，由天骄支付团队进行维护。

## 文件结构

```
├─ asset/                        # 资源文件夹
├─ dist/                         # 输出目录
├─ note/                         # 发版记录文件夹
├─ src/                          # 源文件
│   ├─ script/                   # 脚本（暂未用到）
│   ├─ style/                    # 样式
│   │   └─ md.css                # 默认样式
│   └─ template/                 # 模板
│       ├─ layout/               #
│       │   ├─ core.pug          # 核心模板
│       │   └─ head.pug          # 头部信息
│       ├─ index.pug             # 首页
│       └─ note.pug              # 发版记录
├─ .eslintrc.yml                 #
├─ .gitignore                    #
├─ .npmrc                        #
├─ build.js                      # 构建脚本
├─ favicon.png                   # 站点图标
├─ LICENSE                       #
├─ package.json                  #
├─ README.md                     #
└─ _config.yml                   # 站点配置文件
```

## Usage

直接运行脚本即可：

```bash
node build
```

## 文件编写说明

发布记录入口在 `_config.yml` 文件中的 `list` 属性。

具体对应的文件放置到 `note` 文件夹中。

图片资源文件放置到 `asset` 文件夹中。

本地的图片资源文件使用相对路径进行引用即可。

文档采用 `markdown` 编写。

************
