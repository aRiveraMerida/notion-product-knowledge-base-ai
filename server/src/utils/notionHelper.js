const { Client } = require('@notionhq/client')
require('dotenv').config({ path: '../.env' })

const productSentimentMap = {
  1: 'Positive',
  2: 'Neutral',
  3: 'Negative'
}

async function addItemToDatabase(item, notionKey, databaseId) {
  const notion = new Client({ auth: notionKey })

  const { type, title, priority, dueDate } = item
  const sentiment = productSentimentMap[item.sentiment]
  const properties = {
    Category: {
      id: 'category',
      type: 'select',
      select: { name: type }
    },
    Sentiment: {
      id: 'sentiment',
      type: 'select',
      select: { name: sentiment }
    },
    Priority: {
      id: 'priority',
      type: 'select',
      select: { name: priority }
    },
    Title: {
      id: 'title',
      type: 'title',
      title: [{ text: { content: title } }]
    },
    'Due Date': {
      id: 'Due Date',
      type: 'date',
      date: { start: dueDate }
    }
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties
    })

    return response
  } catch (error) {
    throw error
  }
}

async function getItemFromDatabase(itemId, notionKey) {
  const notion = new Client({ auth: notionKey })

  try {
    const response = await notion.pages.retrieve({ page_id: itemId })
    return response
  } catch (error) {
    throw error
  }
}

async function updateItemInDatabase(itemId, updatedProperties, notionKey) {
  const notion = new Client({ auth: notionKey })

  try {
    const response = await notion.pages.update({
      page_id: itemId,
      properties: updatedProperties
    })

    return response
  } catch (error) {
    throw error
  }
}

async function deleteItemFromDatabase(itemId, notionKey) {
  const notion = new Client({ auth: notionKey })

  try {
    const response = await notion.pages.update({
      page_id: itemId,
      archived: true
    })

    return response
  } catch (error) {
    throw error
  }
}

async function getItemsFromDatabase(databaseId, notionKey) {
  const notion = new Client({ auth: notionKey })

  try {
    const response = await notion.databases.query({
      database_id: databaseId
    })

    return response.results
  } catch (error) {
    throw error
  }
}

async function getItemsByNameFromDatabase(databaseId, name, notionKey) {
  const notion = new Client({ auth: notionKey })

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Title',
        title: { equals: name }
      }
    })

    return response.results
  } catch (error) {
    throw error
  }
}

module.exports = {
  addItemToDatabase,
  getItemFromDatabase,
  updateItemInDatabase,
  deleteItemFromDatabase,
  getItemsFromDatabase,
  getItemsByNameFromDatabase
}
