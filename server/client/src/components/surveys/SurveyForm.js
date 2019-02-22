// SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import _ from "lodash";
//So in addition to the redux form helper I'm also going to pull out the "Field" component. The field component is a helper provided by redux form for rendering absolutely any type any type of traditional HTML form elements like text areas text inputs file inputs checkboxes radio buttons dropdown it's all those types of things can all be somehow rendered or represented by this field component.

//we can kind of think of this field component here as being like a Swiss Army knife of sorts. It's like a component that we can use to show any type of different input or any type of different HTML elements that will somehow collect input from our user.

import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "emails" }
];

class SurveyForm extends Component {
  renderFields() {
    {
      /* 
    Rather than veery sequentially very imperatively listing out all the different fields that I want to show inside of this form we are going to iterate over this array right here. And for every single object in here we're going to create and return one custom field object that makes use of the properties inside this object. So all we're really doing here is kind of removing or kind of generalizing the changing props between each of these fields and the whole right one function that can be used to always right or always create any number of fields.
    */
    }
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {/* 
  //We have to provide the field components some number of minimum props to tell it how to render itself. So by itself the fuel component really does nothing. We have to give it a lot of different instructions to tell it how to behave. So we're going to pass this thing a couple of different props. First we're going to give it a type of text.We're going to give it a name of survey title and we're going to give it a component of input like so.
*/}
          {this.renderFields()}

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
