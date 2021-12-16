import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home({ articles }) {
  if (!articles) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Modern News app</title>
        <meta name="description" content="Modern News app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Articles</h1>
        <ul>
          {articles.map((article) => (
            <article key={article.id}>
              <Link href="/articles/[id]" as={`/articles/${article.id}`}>
                  <a>
                    <h5>{article.title}</h5>
                  </a>
              </Link>
            </article>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}></footer>

    </div>
  )
}


export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3000/api/articles')
  const articles = await res.json()

  if (!articles) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { articles },
  }
}