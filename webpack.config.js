// webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.MODE,
  entry: './src/index.tsx',
  resolve: {
    // 번들링을 할 파일 설정
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ['esbuild-loader'],
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[contenthash].[ext]',
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    // 번들한 css파일과 js파일을 html 파일에 link 태그, script태그로 추가
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // 환경 정보를 제공
    new webpack.EnvironmentPlugin(['MODE', 'PORT']),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        MODE: process.env.MODE,
        API_URL: process.env.API_URL,
      }),
    }),
    new CopyPlugin({
      patterns: [{from: 'public', to: '', globOptions: {ignore: ['**/index.html']}}],
    }),
  ],
  devServer: {
    host: 'localhost',
    port: process.env.PORT,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  devtool: process.env.MODE === 'production' ? false : 'eval-cheap-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
