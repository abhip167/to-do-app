import { errorMessageSelector } from "../utils";

before(() => cy.visit("http://localhost:5173/"));

describe("Validate input field", () => {
  it("", () => {
    //  try clicking on submit with empty input field
    cy.get("form#newTaskForm").within(() => {
      cy.root().submit();
    });

    //compare error message
    cy.get(errorMessageSelector).should(
      "have.text",
      "This field cannot be empty"
    );
  });
});
