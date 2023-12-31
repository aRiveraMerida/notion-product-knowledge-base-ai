import { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../../utils/api'

import UserInputField from './UserInputField'
import OutputArea from './OutputArea'

const emptyAPIResponse = {
  code: 0,
  status: '',
  data: {
    message: 'Please input your task...',
    category: '',
    sentiment: '',
    priority: '',
    title: '',
    dueDate: ''
  }
}

class UserInputSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: '',
      apiResponse: emptyAPIResponse,
      openAIKey: '',
      notionKey: '',
      databaseId: ''
    }
  }

  async componentDidMount() {
    let apiKeys = localStorage.getItem('apiKeys')
    apiKeys = JSON.parse(apiKeys)

    if (apiKeys) {
      this.setState({
        openAIKey: apiKeys.openAIKey,
        notionKey: apiKeys.notionKey,
        databaseId: apiKeys.databaseId
      })
    }
  }

  handleTextChange = (event, stateObjectKey) => {
    event.preventDefault()
    const newState = event.target.value
    this.setState({ [stateObjectKey]: newState })
  }

  clearInputText = () => {
    this.setState({ userInput: '', apiResponse: emptyAPIResponse })
  }

  handleSubmit = async () => {
    this.setState({
      apiResponse: {
        data: {
          message: 'Loading...'
        }
      }
    })
    const { userInput, openAIKey, notionKey, databaseId } = this.state
    const payload = { userInput, openAIKey, notionKey, databaseId }
    try {
      let res = await api.processAndSubmitToNotion(payload)
      this.setState({ apiResponse: res, userInput: '' })
    } catch (error) {
      this.setState({ apiResponse: error, userInput: '' })
    }
  }

  saveToLocalStorage = () => {
    const { openAIKey, notionKey, databaseId } = this.state
    const apiKeysJSON = JSON.stringify({ openAIKey, notionKey, databaseId })
    localStorage.setItem('apiKeys', apiKeysJSON)
  }

  clearLocalStorage = () => {
    localStorage.clear()
    this.setState({
      openAIKey: '',
      notionKey: '',
      databaseId: ''
    })
  }

  render() {
    const { userInput, apiResponse, openAIKey, notionKey, databaseId } =
      this.state

    return (
      <section className='row'>
        <div className='col-md-12'>
          <h5>Input</h5>
          <UserInputField
            type='textarea'
            value={userInput}
            handleChange={(e) => {
              this.handleTextChange(e, 'userInput')
            }}
          />
          <button
            type='button'
            className='btn btn-primary my-3'
            onClick={this.handleSubmit}
          >
            Run
          </button>
          <button
            type='button'
            className='btn btn-outline-secondary mx-3'
            onClick={this.clearInputText}
          >
            Clear
          </button>
          <h5>Output</h5>
          <OutputArea response={apiResponse} />
        </div>
        <div className='col-md-4'>
          <h5>Settings</h5>
          <div className='accordion' id='settingsAccordion'>
            <div className='accordion-item'>
              <h2 className='accordion-header'>
                <button
                  className='accordion-button'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseOne'
                  aria-expanded='true'
                  aria-controls='collapseOne'
                >
                  OpenAI
                </button>
              </h2>
              <div
                id='collapseOne'
                className='accordion-collapse collapse show'
                data-bs-parent='#settingsAccordion'
              >
                <div className='accordion-body'>
                  <p>API Key</p>
                  <UserInputField
                    type='password'
                    value={openAIKey}
                    handleChange={(e) => {
                      this.handleTextChange(e, 'openAIKey')
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='accordion-item'>
              <h2 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseTwo'
                  aria-expanded='false'
                  aria-controls='collapseTwo'
                >
                  Notion
                </button>
              </h2>
              <div
                id='collapseTwo'
                className='accordion-collapse collapse'
                data-bs-parent='#settingsAccordion'
              >
                <div className='accordion-body'>
                  <p>API Key</p>
                  <UserInputField
                    type='password'
                    value={notionKey}
                    handleChange={(e) => {
                      this.handleTextChange(e, 'notionKey')
                    }}
                  />
                  <p>Database ID</p>
                  <UserInputField
                    type='text'
                    value={databaseId}
                    handleChange={(e) => {
                      this.handleTextChange(e, 'databaseId')
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='accordion-item'>
              <h2 className='accordion-header'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseThree'
                  aria-expanded='false'
                  aria-controls='collapseThree'
                >
                  Local Storage
                </button>
              </h2>
              <div
                id='collapseThree'
                className='accordion-collapse collapse'
                data-bs-parent='#settingsAccordion'
              >
                <div className='accordion-body'>
                  <button
                    type='button'
                    className='btn btn-outline-secondary me-0 mb-2 me-md-4 mb-md-0'
                    onClick={this.saveToLocalStorage}
                  >
                    Save keys in local storage
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-secondary'
                    onClick={this.clearLocalStorage}
                  >
                    Clear local storage
                  </button>
                  <p className='small'>
                    <em>
                      Note: Be sure to clear your local storage regularly, after
                      each session.
                    </em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

UserInputSection.propTypes = {
  userInput: PropTypes.string,
  apiResponse: PropTypes.object,
  openAIKey: PropTypes.string,
  notionKey: PropTypes.string,
  databaseId: PropTypes.string
}

export default UserInputSection
