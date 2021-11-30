import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { dispatchProjects } from "../../actions/project/project-action-creator";
import LoadingCard from "../general/LoadingCard";
import DisplayProjects from "./DisplayProjects";

function ProjectContainer() {
  const dispatch = useDispatch();
  const { projects, projectsFetching } = useSelector(
    (state) => state.projectReducer
  );

  useEffect(() => {
    dispatch(dispatchProjects());
  }, []);

  if (projectsFetching) {
    return <LoadingCard />;
  } else {
    return (
      <>
        <DisplayProjects projects={projects} />
      </>
    );
  }
}

export default React.memo(ProjectContainer);
