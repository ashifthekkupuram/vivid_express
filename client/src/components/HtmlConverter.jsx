import React from 'react'

const HtmlConverter = ({ content }) => {

    const markup = { __html: content }
  return (
    <div dangerouslySetInnerHTML={markup} />
  )
}

export default HtmlConverter
