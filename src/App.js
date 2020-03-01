import React from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>123</Route>
        <Route path="/t">234</Route>
      </Switch>
    </div>
  );
}

export default App;
