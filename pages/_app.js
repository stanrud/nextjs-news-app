import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Nav from 'components/Nav'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import Container from '@mui/material/Container'
import theme from 'src/theme'
import '../styles/globals.css'

export default function MyApp(props) {
  const { Component, pageProps } = props

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{pageProps.article?.title}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='description' content='Modern News app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Nav />
          <Container maxWidth='md'>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}