import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json)
      .then((data) => setData(data.message))
  }, []);

  return (
    <div className="App">
      <form action="https://classic-rock.onrender.com" method="post">
          <input type="text" name="name"/>
          <input type="submit" />
      </form>
      <img src={logo} className="App-logo" alt="logo" />
      <p>{!data ? "Loading..." : data}</p>

    </div>
  );
}

export default App;
