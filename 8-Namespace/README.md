### 1. Links

- [Modules - Export/Import](https://www.typescriptlang.org/docs/handbook/2/modules.html)
- [Webpack](https://webpack.js.org/)

### 2. Installation Webpack

```shell
$ tsc --init                                                                         # initialize Typescript if not already done
$ npm init                                                                           # creates package.json file
$ npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader # creates node_modules/ and package-lock.json
```

### 3. Configuration Webpack

- Edit `tsconfig.json`:

  - "target": "ES2015"/"ES5"/"ES6"
  - "module": "es2015"
  - "source_map": true
  - Comment out "rootDir"

- Edit `package.json`:
  - Add script command for building with webpack.
    - "scripts" -> "build": "webpack"

```shell
$ nvim webpack.config.js # see file for an example
```

### 4. Build Project

```shell
$ npm run build       # creates dist/app.js
```

### 5. Using Webpack Dev Server

- Edit `webpack.config.js`:

  - Add an entry for "devServer" (see example file)
  - output -> publicPath: '/dist/'

- Edit `package.json`:
  - Add script command for starting Webpacks dev server.
    - "scripts" -> "start": "webpack serve"

#### Start Webpack Dev Server

```shell
$ npm start   # starts live dev server with hot reloading
```

### 6. Webpack for Production

-Install clean webpack plugin:

```shell
npm install --save-dev clean-webpack-plugin
```

- Create new configuration file: `webpack.config.prod.js` (see example file)

- Edit `package.json` file:
  - new build script - `buildprod` - should use new configuration `webpack.config.prod.js`.

```shell
$ npm run buildprod
```
