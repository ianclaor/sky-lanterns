import { useState } from "react";
import "../styles/wishForm.css";
import { saveSubmission } from "../services/wishService";

export default function WishForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveSubmission({
      name: name.trim(),
      message: message.trim(),
    });

    setName("");
    setMessage("");
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      <header className="top-header">
        <div className="header-title">
          Sky Lanterns
        </div>
      </header>

      <main className="main-viewport">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
        <div className="stars-bright"></div>
        <div className="stars-shimmer"></div>

        <div className="wish-card">
          <h1>Make a Wish</h1>

          <p>
            Send your message into the night sky.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Your Name
              </label>

              <input
                type="text"
                id="name"
                value={name}
                placeholder="Enter your name"
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Your Wish / Message
              </label>

              <textarea
                id="message"
                value={message}
                placeholder="Write your message here..."
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Release Lantern
            </button>
          </form>

          {success && (
            <div className="success-msg visible">
              ✨ Your lantern has been released!
            </div>
          )}
        </div>
      </main>
    </>
  );
}