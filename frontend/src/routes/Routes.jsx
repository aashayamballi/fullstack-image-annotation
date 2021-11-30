import React from "react";

// third party imports
import { Route, Switch } from "react-router-dom";

import ProjectContainer from "../components/project/ProjectContainer";
import DetailProject from "../components/project/DetailProject";
import CreateProject from "../components/project/CreateProject";
import AnnotationContainer from "../components/image-annotation/AnnotationContainer";

export default function RenderRoutes() {
  return (
    <Switch>
      <Route path="/" component={ProjectContainer} exact />
      <Route path="/project/create" exact component={CreateProject} />
      <Route path="/project/:projectSlug" exact component={DetailProject} />
      <Route
        path="/project/image/:imgId"
        exact
        component={AnnotationContainer}
      />
      <Route component={() => <h1>Page Not Found!</h1>} />
    </Switch>
  );
}
