// webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.MODE,
  entry: './src/index.tsx',
  resolve: {
    // 번들링을 할 파일 설정
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    // loader 설정 - 등록한 로더의 뒤의 요소부터 번들링에 반영
    // node_modules 제외
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
      'process.env': JSON.stringify(process.env),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '', globOptions: { ignore: ['**/index.html'] } },
      ],
    }),
  ],
  devServer: {
    host: 'localhost',
    port: process.env.PORT,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  devtool: 'eval-cheap-source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
