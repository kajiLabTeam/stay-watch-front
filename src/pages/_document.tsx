import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel='apple-touch-icon' sizes='180x180' href='static/favicon/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='static/favicon/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='static/favicon/favicon-16x16.png' />
          <link rel='manifest' href='static/favion/site.webmanifest' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
