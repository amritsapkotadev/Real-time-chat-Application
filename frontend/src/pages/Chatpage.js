import React, { useEffect } from 'react';
import axios from 'axios';

const Chatpage = () => {

  async function fetchchats() {
    try {
      const { data } = await axios.get("/api/chat");
      console.log("fetching chats");
      console.log(data);
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  useEffect(() => {
    fetchchats();
  }, []);

  return (
    <div>
      <h1>Chat Page</h1>
      {/* You can render chats here later */}
    </div>
  );
};

export default Chatpage;
