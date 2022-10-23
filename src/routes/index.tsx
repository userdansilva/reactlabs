import Miragejs from "@miragejs/pages";
import { Routes as Switch, Route } from "react-router-dom";
import Welcome from "@pages/index";
import Crud from "modules/crud/pages";

function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Welcome />} />
      <Route path="/miragejs" element={<Miragejs />} />
      <Route path="/crud" element={<Crud />} />
    </Switch>
  );
}

export default Routes;
