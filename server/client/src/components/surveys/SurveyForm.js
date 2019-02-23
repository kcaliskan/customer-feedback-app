// SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
//So in addition to the redux form helper I'm also going to pull out the "Field" component. The field component is a helper provided by redux form for rendering absolutely any type of traditional HTML form elements like text areas text inputs file inputs checkboxes radio buttons dropdown it's all those types of things can all be somehow rendered or represented by this field component.

//we can kind of think of this field component here as being like a Swiss Army knife of sorts. It's like a component that we can use to show any type of different input or any type of different HTML elements that will somehow collect input from our user.

import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    // eslint-disable-next-line
    {
      /* 
    Rather than veery sequentially very imperatively listing out all the different fields that I want to show inside of this form we are going to iterate over this array right here. And for every single object in here we're going to create and return one custom field object that makes use of the properties inside this object. So all we're really doing here is kind of removing or kind of generalizing the changing props between each of these fields and the whole right one function that can be used to always right or always create any number of fields.
    */
    }
    return _.map(formFields, ({ label, name }) => {
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
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {/* 
  //We have to provide the field components some number of minimum props to tell it how to render itself. So by itself the fuel component really does nothing. We have to give it a lot of different instructions to tell it how to behave. So we're going to pass this thing a couple of different props. First we're going to give it a type of text.We're going to give it a name of survey title and we're going to give it a component of input like so.
*/}
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>

          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

//Now if redux form gets that Array object back and it is empty redux form assumes that the entire form is valid and everything is ready and good to go.

//However if the error object has any properties or values inside of it then redux form will see those properties and values and it will assume that the form values must be somehow invalid and so it will stop the submission process.

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

//"Validate" function will be automatically ran any time the user attempts to submit the form and so we can use that as our opportunity to kind of validate the different inputs so the user has added and provide feedback to the user to tell them whether or not they have done basically the right thing.
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);

//So if we say "destroyOnUnmount" of true which in it is true by default then redux form is going to kill this form any time the survey form is unmounted or no longer shown on the screen. But if we say false then that means "hey I don't care if this component goes away I don't care if the survey form is no longer being rendered. Don't try to destroy that form. Don't dump the values keep the values around."
