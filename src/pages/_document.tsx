import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel='apple-touch-icon' sizes='180x180' href='apple-touch-icon.png' />
          <link rel='icon' href='favicon.svg' type='image/svg+xml' />
          <link rel='icon' type='image/png' sizes='32x32' href='favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='favicon-16x16.png' />
          <link rel='manifest' href='site.webmanifest' />
          <link rel='mask-icon' href='safari-pinned-tab.svg' color='#5bbad5' />
          <link
            href='https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap'
            rel='stylesheet'
          />

          <meta
            name='description'
            content='コミュニティにおけるメンバーの滞在情報・履歴の確認ができるサービスです。'
          />
        </Head>
        <body className='font-kosugi'>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
