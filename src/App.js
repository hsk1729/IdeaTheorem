import "./App.css";
import Header from "./Header";
import Form from "./Form";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="form_block">
        <div className="form">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
