import PropTypes from 'prop-types'

const UserInputField = (props) => {
  const { type = 'text', value, handleChange } = props

  if (type === 'textarea') {
    return (
      <>
        <textarea
          value={value}
          onChange={handleChange}
          className='form-control w-100'
        />
      </>
    )
  }

  return (
    <>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        className='form-control'
      />
    </>
  )
}

UserInputField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func
}

export default UserInputField
