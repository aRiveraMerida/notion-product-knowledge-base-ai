import PropTypes from 'prop-types'
/* import { useEffect } from 'react'
import { API } from '../../utils/api_axios' */

export default function OutputArea(props) {
  const { response } = props
  const { data = {} } = response
  const { message = '' } = data

  let messageMarkup

  if (response && response.code === 500) {
    messageMarkup = (
      <div className='alert alert-danger' role='alert'>
        {message}
      </div>
    )
  } else if (response && response.code === 201) {
    messageMarkup = (
      <div className='alert alert-success' role='alert'>
        <p>{message}</p>
        <ul>
          <li>Title: {data.title}</li>
          <li>Category: {data.category}</li>
          <li>Priority: {data.priority}</li>
          <li>Sentiment: {data.sentiment}</li>
          <li>Due date: {data.dueDate}</li>
        </ul>
      </div>
    )
  } else {
    messageMarkup = null
  }

  return <div>{messageMarkup}</div>
}

OutputArea.propTypes = {
  response: PropTypes.shape({
    code: PropTypes.number,
    data: PropTypes.shape({
      message: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.string,
      priority: PropTypes.string,
      sentiment: PropTypes.string,
      dueDate: PropTypes.string
    })
  })
}
