---
description: ディレクトリ構成ルール
---

# ディレクトリ構成ルール

`src/` 配下は次の構成とすること．

```text
src/
├── routes/                    # ルート定義のみ（TanStack Router のファイルベースルーティング）
├── pages/<PageName>/          # 画面と 1 対 1 対応．PageName はアッパーキャメルケース
│   ├── index.tsx              # 画面の root コンポーネント
│   ├── components/            # この画面でしか使わないコンポーネント
│   └── hooks/                 # この画面でしか使わない hooks
├── components/                # 複数画面で使うコンポーネント
│   ├── common/                # 汎用 UI（Button, Loading 等）
│   ├── icons/                 # アイコン
│   └── layout/                # アプリ全体のレイアウト（Header, Footer 等）
├── hooks/                     # 複数画面で使う hooks
├── atoms/                     # jotai の atom
├── providers/                 # Provider コンポーネント
├── types/                     # 複数画面で使う型
├── utils/                     # 複数画面で使うユーティリティ
├── routeTree.gen.ts           # 自動生成されるルート定義（編集しない）
├── main.tsx
├── globals.css
└── vite-env.d.ts
```

## ルール

- 画面の root コンポーネントは `src/pages/<PageName>/index.tsx` に配置する
  - 例: `src/pages/RoomHistory/index.tsx`
- `routes/` には画面の実装を書かない．`pages/<PageName>` の root コンポーネントを参照するだけにする
  - `validateSearch` などルート定義に属するものは `routes/` に置いてよい
- その画面でしか使わないものは `src/pages/<PageName>/` 配下に置く
  - `components/`, `hooks/` のほか，必要に応じて `utils/`, `types/`, `constants/` なども同様
- 複数の画面で使うものは `src/components/`, `src/hooks/`, `src/utils/`, `src/types/` などに置く
- ある画面でしか使われていなかったものが他の画面でも使われるようになったら，`src/` 直下へ移動する
- 画面同士で import しない（`pages/A` から `pages/B` を参照しない）．共有したいものは `src/` 直下へ移す
- `src/features/` は廃止．新規に作らない
