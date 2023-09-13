#!/usr/bin/env sh

# 创建脚本用于自动部署到github仓库上面、并实现自动更新静态网页

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m '更新'

# 推到你仓库的的 gh-page 分支
# 将 <USERNAME>/<REPO> 替换为你的信息
git push -f git@github.com:gavinchenz/blog.git master:gh-pages

cd -