#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 推到 github 仓库的 main 分支
git init
git add -A
git commit -m '更新'
git branch -M main
git remote add origin git@github.com:gavinchenz/gavinchenz.github.io.git
git push -f git@github.com:gavinchenz/gavinchenz.github.io.git main

cd -