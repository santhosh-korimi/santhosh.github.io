import React, { useEffect, useState } from 'react'

const Contact = () => {
  const [showSpinner, setShowSpinner] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleOnChange = (e) => {
    const { name, value } = e.target
    if (name === 'name') {
      setName(value)
    } else if (name === 'email') {
      setEmail(value)
    } else {
      setMessage(value)
    }
  }

  const handleOnSubmit = async () => {
    if (name && email && message) {
      setShowSpinner(true)
      const req = await fetch(`https://script.google.com/macros/s/AKfycbx8LKGWk723JU2YtznxoPtWgtNTLELea5rgA0O7Uv25t8yKU0w/exec?name=${name}&email=${email}&message=${message}`)
      const res = await req.json();
      console.log('res', res)
      setShowSpinner(false)
      setShowSuccessMessage(true)
    }
  }

  useEffect(() => {
    if (showSuccessMessage) {
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)
    }
  }, [showSuccessMessage])
  
  return (
    <section className="sk--contact-section" id="contact">
      <h2 className="main--heading">
        - Say Hello!
      </h2>
      <div className="sk--contact-flex-section">
        <div className="sk--lside">
          <p className="desc">
            I am always open to discuss your project, improve your online presence or help with your application challenges.
          </p>
          <div className="email-section">
            <p>Email me at</p>
            <a href='mailto:santhosh@korimi.in'>santhosh@korimi.in</a>
          </div>
        </div>
        <div className="sk--rside">
          {showSuccessMessage && (
            <div className="thank-you-message hide">
              <h4 className="thanks">
                Hey, Thanks for reaching out. I'll contact you soon.
              </h4>
            </div>
          )}
          <div className="form-section">
            <input
              type="text"
              placeholder='Name'
              id="name"
              value={name}
              name="name"
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="form-section">
            <input
              type="text"
              placeholder='Email'
              id="email"
              value={email}
              name="email"
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="form-section">
            <textarea
              id="message"
              placeholder='Message'
              rows="5"
              value={message}
              name="message"
              onChange={handleOnChange}
              autoComplete="off"
              ></textarea>
          </div>
          <div className="button-section">
            <button disabled={showSpinner} id="submitButton" onClick={handleOnSubmit}>
              Get in Touch
              {showSpinner && (
                <span id="spinner">
                  <i className="fa fa-spin fa-spinner" />
                </span>
              )}
            </button>
            <div className="span-after" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
