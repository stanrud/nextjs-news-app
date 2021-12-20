const fs = require('fs')

let articles = require('../data/articles.json')

export const articlesRepo = {
  getAll: () => articles.slice(-5).reverse(),
  getById: id => articles.find(x => x.id.toString() === id.toString()),
  find: x => articles.find(x),
  create,
}

function create(article) {
  article.id = articles.length ? Math.max(...articles.map(x => x.id)) + 1 : 1
  article.createdAt = new Date().toISOString()
  articles.push(article)
  saveData()
}

function saveData() {
  fs.writeFileSync('data/articles.json', JSON.stringify(articles, null, 2))
}