function get(url) {
  const requestOptions = {
    method: 'GET',
  }
  return fetch(url, requestOptions).then(handleResponse)
}

async function post(url, imageUrl, body) {
  const formData = new FormData()
  formData.append('file', body.image[0])
  formData.append('upload_preset', 'docs_upload_example_us_preset')

  body.image = await fetch(imageUrl, {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => data.secure_url)

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
        const error = (data && data.message) || response.statusText
        return Promise.reject(error)
    }

    return data
  })
}

export const fetchWrapper = {
  get,
  post,
  put,
}
