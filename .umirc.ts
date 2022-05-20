import { defineConfig } from 'umi';
const webpack = require('webpack');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/cloudIde', component: '@/pages/cloudIde' },
    
  ],
  alias: {
    'fs': 'browserfs/dist/shims/fs.js',
    'buffer': 'browserfs/dist/shims/buffer.js',
    'path': 'browserfs/dist/shims/path.js',
    'processGlobal': 'browserfs/dist/shims/process.js',
    'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
    'bfsGlobal': require.resolve('browserfs')
  },
  fastRefresh: {},
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 设置 alias
    // memo.resolve.alias.set('fs', 'browserfs/dist/shims/fs.js')
    // const a = new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' })
    memo
    .plugin('prodive')
    .use(new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal' }))
  },
});
