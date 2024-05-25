import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import {type Configuration} from 'webpack';
const config: Configuration = {
  target: 'node',
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '.tmp/dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  node: {__dirname: false, __filename: false},
  externalsType: 'commonjs',
  module: {
    rules: [
      {test: /\.(sa|sc|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/},
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {compress: true, mangle: false},
      }),
    ],
  },
};
export default config;
