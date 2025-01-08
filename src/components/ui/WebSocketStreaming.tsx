import { useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

const WebSocketStreaming = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState<any>(null);
  const [userId, setUserId] = useState("abc")

  // Function to connect to WebSocket
  const connectWebSocket = () => {
    const socket = new SockJS("http://localhost:8080/notification/ws?userId=" + userId, null, {
      withCredentials: true
    });
    const client = over(socket);

    client.connect({}, () => {
      console.log("Connected to WebSocket");
      setConnected(true);

      // Subscribe to the stream topic
      client.subscribe("/user/topic/stream", (message) => {
        console.log("Websocket message" + message);
        setMessages((prev) => [...prev, message.body]);
      });
    });

    setStompClient(client);
  };

  // Function to send HTTP request
  const sendHttpRequest = async () => {
    try {
      const response = await fetch("http://localhost:8080/notification", {
        method: "POST",
        credentials: "include"
      });
      console.log("HTTP Response:", response);
      const id = await response.text()
      console.log(id)
      setUserId(id)
    } catch (error) {
      console.error("HTTP Request Failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        WebSocket Streaming with Notification Service
      </h1>

      <div className="space-x-4 mb-6">
        <button
          onClick={connectWebSocket}
          className={`px-4 py-2 rounded-md text-white font-semibold ${connected ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          disabled={connected}
        >
          {connected ? "Connected to WebSocket" : "Connect to WebSocket"}
        </button>
        <button
          onClick={sendHttpRequest}
          className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
        >
          Send HTTP Request
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-md shadow-md p-4">
        <h2 className="text-lg font-bold text-gray-700 mb-2">Streamed Messages:</h2>
        <div
          className="overflow-y-auto h-64 border border-gray-300 rounded-md p-2 bg-gray-50 text-black"
          style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => <div key={index}>{msg}</div>)
          ) : (
            <p className="text-gray-500">No messages streamed yet...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebSocketStreaming;
