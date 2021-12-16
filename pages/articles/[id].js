import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'

export default function Article({ article }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!article) return <div>Loading...</div>

  return(
    <div className={styles.container}>
      <main className={styles.main}>
        <article key={article.id}>
          {article.title}
        </article>
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/articles')
  const articles = await res.json()

  const paths = articles.map((article) => ({
    params: { id: article.id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/articles/${params.id}`)
  const article = await res.json()

  if (!article) {
    return {
      notFound: true,
    }
  }

  return { props: { article } }
}