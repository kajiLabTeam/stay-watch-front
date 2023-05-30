## production

https://stay-watch-go.kajilab.tk/

## development

develop ブランチの vercel
https://stay-watch-front-fd19.vercel.app/

### 環境構築の手順 <br><br>

1. stay-watch-backend の README を見てバックエンドの環境構築を行う

2. stay-watch-front のクローン

   stay-watch-front をクローンする

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

6. 実行

   下のを実行し localhost:3000/ で開ければ完了

   ```
   yarn dev
   ```

### 必要な VSCode の拡張機能<br><br>

- Prettier - Code formatter

  コードを整えてくれる

- ESLint

  「console.log() があると warning を出す」などのプロジェクト独自のコード規則を設定できる

- Tailwind CSS IntelliSense

  本プロジェクトに用いられている Tailwind CSS を編集するときにあると便利

- OpenAPI(Swagger) Editor

  swagger.yml を編集する上であるとよい

- Swagger Viewer

  Shift + command + p で swagger.yml のプレビューができる

### よくあるエラーの対処法<br><br>

- Yarn Build or Lint Error

  フォーマットルールに沿っていないコードである場合に出る

  下のコマンドを行うとコードを整形してくれて解決できる  
  ( 保存時に自動で整形してくれるように設定するのがおすすめ )

  ```
  yarn fix
  ```
