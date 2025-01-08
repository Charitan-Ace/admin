import "./App.css";
import APIClient from "./lib/api/Client";

function App() {
  const client = new APIClient("http://localhost:8080");

  async function register() {
    await client.auth.register(
      "khoanguyen.do@outlook.com",
      "password",
      "DONOR",
      {},
    );
  }

  async function login() {
    await client.auth.login("khoanguyen.do@outlook.com", "password");
  }

  async function request() {
    await client.auth.request();
  }

  return (
    <div className="flex items-center justify-center">
      <button onClick={register}>register</button>
      <button onClick={login}>login</button>
      <button onClick={request}>request</button>
    </div>
  );
}

export default App;
