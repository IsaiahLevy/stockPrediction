import React from "react";
import "./Tweet.css"; // Ensure you have this CSS file

const Tweet = ({ username, handle, content, imageSrc, stockSymbol }) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <img src={imageSrc} alt={username} className="tweet-avatar" />
        <div className="tweet-user-info">
          <span className="tweet-username">{username}</span>
          <span className="tweet-handle">@{handle}</span>
        </div>
      </div>
      <div className="tweet-content">
        <p>{content}</p>
        <span className="tweet-stock-symbol">#{stockSymbol}</span>
      </div>
    </div>
  );
};

export default Tweet;
