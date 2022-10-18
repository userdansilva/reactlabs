import Miragejs from "@miragejs/pages";
import { Routes as Switch, Route } from "react-router-dom";
import Welcome from "@pages/index";

function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Welcome />} />
      <Route path="/miragejs" element={<Miragejs />} />
    </Switch>
  );
}

export default Routes;
