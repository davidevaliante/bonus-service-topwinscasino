import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'
import {configuration} from '../configuration'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        })
      const initialProps = await NextDocument.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      }
    } finally {
      styledComponentSheet.seal()
    }
  }


  // <link href="https://fonts.googleapis.com/css2?family=Turret+Road:wght@500;800&display=swap" rel="stylesheet" />

  render() {
    return (
      <Html lang="it">
        <Head>
          {configuration.fontString.length >  0 && <link href={configuration.fontString} rel="stylesheet" />}
          <link rel="shortcut icon" href="/icons/slot_bar_icon.svg" />
          <meta name="google-site-verification" content="M8eO4mYEdHHtKpSYgGOeXo-E-kFAfOmFMUwmaii2bkM" />
          {configuration.youtubeMetatag && <meta name="google-site-verification" content={configuration.youtubeMetatag} />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
