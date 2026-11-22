---
paths:
  - '**/*.tsx'
---

# JSX コーディングルール

型定義に関する基本方針は [typescript.md](./typescript.md) に準ずる．

## コンポーネント

- コンポーネントは関数宣言（`function`）で定義すること
  - 例）`function ActivityCard({ activity }: ActivityCardProps) { ... }`
- 1ファイルにつき1コンポーネントとすること
  - ルートファイル（`web/src/routes/` 配下）は例外とし，そのルートの `component`・`notFoundComponent` などに渡すコンポーネントを同じファイルに定義してよい
- コンポーネント名はパスカルケース（`PascalCase`）で命名し，ファイル名もコンポーネント名と一致させること
- コンポーネントが大きくなった場合は，責務ごとに小さいコンポーネントへ分割すること

## Props

- Props の型は `interface` で定義し，コンポーネント名 + `Props` という名前にすること
  - 例）`interface ActivityCardProps { ... }`
- Props の分割代入は関数の引数部分で行うこと
  - 例）`function ActivityCard({ activity, onStarToggled }: ActivityCardProps) { ... }`
- children を受け取る場合は `ReactNode` 型を使用すること
- Props に関数を渡す場合は `on` + 動詞（過去形）で命名すること
  - 例）`onStarToggled`, `onPageChanged`

## イベントハンドラ

- JSX内でのインライン関数定義（`onClick={() => ...}`）は，簡潔な処理のみに限定すること
  - 複雑な処理はコンポーネント内で関数として定義してから渡すこと
- イベントハンドラの命名は `handle` + 動詞（現在形）で統一すること
  - 例）`handleSubmit`, `handleInvitationAdd`

## リンク

- `<a>` タグは使用せず，`@tanstack/react-router` の `Link` を使用すること
  - ボタンの見た目のリンクも `Link` で描画すること
  - サーバールート（例：`/auth/sign-in`）のように，ドキュメント全体の読み込みを伴う遷移も `<a>` に戻さず，`Link` の `reloadDocument` を使用すること

## useEffect

- `useEffect` は極力使用しないこと
- `useEffect` を使用する場合は https://ja.react.dev/learn/you-might-not-need-an-effect を参照し，使用する理由を十分に検討すること

## JSX 内の条件分岐

- 表示・非表示を切り替える場合は，`&&` 演算子を使用すること
  - 例）`{isSignedIn && <AppHeaderUserLink />}`
- 条件によって表示するコンポーネントを切り替える場合は，三項演算子を使用すること
  - 例）`{isSignedIn ? <AppHeaderUserLink /> : <AppHeaderSignInButton />}`
- 三項演算子の各分岐には，複数の要素からなる JSX を直接書かず，1つのコンポーネントにすること
  - NG例）`{isSignedIn ? <div><Avatar /><p>{name}</p></div> : <AppHeaderSignInButton />}`
  - OK例）`{isSignedIn ? <AppHeaderUserLink /> : <AppHeaderSignInButton />}`
- 条件分岐が3つ以上ある場合は，コンポーネントに切り出して `switch` 文を使用すること
- 条件分岐は入れ子にしてはいけない．入れ子になった場合はコンポーネントに切り出すこと
  - NG例）`{isSignedIn ? (isOwner ? <EditButton /> : <JoinButton />) : <AppHeaderSignInButton />}`
  - OK例）`{isSignedIn ? <ActivityAction isOwner={isOwner} /> : <AppHeaderSignInButton />}`
