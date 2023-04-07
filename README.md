This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## development

https://stay-watch-go.kajilab.tk/

コミットやプルを送る前に下のを実行して自動修正をかける
(ファイル変更時に自動で実行するようにする方法もある)

```
yarn fix
```

### 環境構築の手順 <br><br>
1. stay-watch-backend のREADME を見てバックエンドの環境構築を行う

2. stay-watch-front のクローン

    GitHub Desktop からstay-watch-front を任意のディレクトリにクローンする

3. .env.local の作成

    /stay-watch-front/ のディレクトリに .env.local ファイルを作成する

    中身は先駆者からもらう


4. yarn のインストール

    ```
    sudo npm install -g yarn
    ```

5. npm run が使えるようにする

    ```
    npm i npm-run-all
    ```

6. ESLint のインストール

    ```
    sudo npm install -g eslint
    ```

7. 実行

    下のを実行し localhost:3000/ で開ければ完了
    ```
    yarn dev
    ```

### 必要なVSCodeの拡張機能<br><br>

- Prettier - Code formatter

    以下を行うとコードを整えてくれる
    ```
    yarn fix
    ```

- EJS langage support

    .ejs ファイルを編集するときにあると便利

- ESLint

    「console.log() があるとwarningを出す」などのプロジェクト独自のコード規則を設定できる

- Tailwind Css

    本プロジェクトに用いられているTailwind CSS を編集するときにあると便利

- OpenAPI(Swagger) Editor

    swagger.yml を編集する上であるとよい

- Swagger Viewer

    Shift + command + p でswagger.yml のプレビューができる
