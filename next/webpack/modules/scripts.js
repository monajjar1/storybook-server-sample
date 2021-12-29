export const rules = [
  {
    test: /\.?jsx?$/,
    exclude: /node_modules/,
    use: [
    
      {
        loader: "babel-loader",
      },
    ],
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
];
