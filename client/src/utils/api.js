const API_DOMAIN = "http://localhost:8000";

const processAndSubmitToNotion = async ({ query, body }) => {
  const { openAIKey, notionKey, databaseId } = query;
  const queryFormated = `?openAIKey=${openAIKey}&notionKey=${notionKey}&databaseId=${databaseId} }`;

  return new Promise((resolve, reject) => {
    fetch(`${API_DOMAIN}/api/model/item${queryFormated}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { processAndSubmitToNotion };
