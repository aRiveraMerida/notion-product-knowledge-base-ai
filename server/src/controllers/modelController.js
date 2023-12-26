const { processUserText } = require('../utils/openAiHelper')
const {
  addItemToDatabase,
  getItemFromDatabase,
  updateItemInDatabase,
  deleteItemFromDatabase,
  getItemsFromDatabase,
  getItemsByNameFromDatabase
} = require('../utils/notionHelper')

async function processAndSubmitToNotion(req, res) {
  const { userInput, openAIKey, notionKey, databaseId } = req.body

  try {
    const databaseItem = await processUserText(userInput, openAIKey)
    let { sentiment, priority } = databaseItem

    // Make sure sentiment is between 1 and 3
    const sentimentValue = Number(sentiment)
    if (sentimentValue > 3 || sentimentValue < 1) {
      databaseItem.sentiment = '2'
    }

    // Make sure priority is between 1 and 4
    const priorityValue = Number(priority)
    if (!(priorityValue < 4) || !(priorityValue >= 1)) {
      databaseItem.priority = '4'
    }

    const response = await addItemToDatabase(
      databaseItem,
      notionKey,
      databaseId
    )

    const data = {
      message: 'Item added to database',
      category: response.properties.Category.select.name,
      sentiment: response.properties.Sentiment.select.name,
      priority: response.properties.Priority.select.name,
      title: response.properties.Title.title[0].plain_text,
      dueDate: response.properties['Due Date'].date.start
    }

    return res.status(201).json({
      code: 201,
      status: 'success',
      data: data
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      code: 500,
      status: 'error',
      data: {
        message: 'Error processing user input'
      }
    })
  }
}

async function retrieveItemFromNotion(req, res) {
  const { itemId, notionKey } = req.body

  try {
    const item = await getItemFromDatabase(itemId, notionKey)
    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function updateItemInNotion(req, res) {
  const { itemId, updatedProperties, notionKey } = req.body

  try {
    const response = await updateItemInDatabase(
      itemId,
      updatedProperties,
      notionKey
    )
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function deleteItemFromNotion(req, res) {
  const { itemId, notionKey } = req.body

  try {
    const response = await deleteItemFromDatabase(itemId, notionKey)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function retrieveItemsFromNotion(req, res) {
  const { databaseId, notionKey } = req.body

  try {
    const items = await getItemsFromDatabase(databaseId, notionKey)
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function retrieveItemsByNameFromNotion(req, res) {
  const { databaseId, name, notionKey } = req.body

  try {
    const items = await getItemsByNameFromDatabase(databaseId, name, notionKey)
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  processAndSubmitToNotion,
  retrieveItemFromNotion,
  updateItemInNotion,
  deleteItemFromNotion,
  retrieveItemsFromNotion,
  retrieveItemsByNameFromNotion
}
