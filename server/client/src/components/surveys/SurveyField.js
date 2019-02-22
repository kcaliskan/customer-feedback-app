// SurveyField contains logic to render a single label and text input

import React from "react";

export default ({ input, label }) => {
  return (
    <div>
      {/* 
     {...input} --> says hey look input we've got a big ole object right here with a lot of props that we want to pass to you but we don't want to pass it as like as specifically named property. We want you to just have this object in all the keys and values that are in it to do so. We put down the curly braces that dot dot dot input and that's pretty much it.
      */}
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};
