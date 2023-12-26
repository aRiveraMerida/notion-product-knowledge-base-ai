const API_DOMAIN = 'http://localhost:8000'

const processAndSubmitToNotion = async (props) => {
  const { userInput, openAIKey, notionKey, databaseId } = props
  const payload = { userInput, openAIKey, notionKey, databaseId }

  return new Promise((resolve, reject) => {
    fetch(`${API_DOMAIN}/api/model/item`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default { processAndSubmitToNotion }
