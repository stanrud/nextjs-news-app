
import { apiUrl, cloudinaryUrl } from 'config'
import { fetchWrapper } from 'helpers/fetch-wrapper'

const baseUrl = `${apiUrl}/articles`

function getAll(params) {
  return fetchWrapper.get(baseUrl, params)
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`)
}

function create(params) {
  return fetchWrapper.post(baseUrl, cloudinaryUrl, params)
}

export const articleService = {
  getAll,
  getById,
  create,
}