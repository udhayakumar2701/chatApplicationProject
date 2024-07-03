import React from 'react'

const chatApp = () => {
  return (
    <div>
      <header className="bg-success p-2">
        <h3>Chat App</h3>
      </header>
      <main className="flex-grow-1 p-2">
        {/* Your main content here */}
        
      </main>
        <footer className="bg-light p-2">
        <div className="d-flex">
          <input type="text" id="message" className="form-control me-2" placeholder="Type your message" />
          <button id="send" className="btn btn-primary">Send</button>
        </div>
      </footer>
    </div>
  )
}

export default chatApp
