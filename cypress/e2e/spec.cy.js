import { dummyTasks, deleteTaskButtonSelector } from "../utils";

before(() => cy.visit("http://localhost:5173/"));

describe("Test webpage", () => {
  it("validate header", () => {
    cy.get(`h1`).should(($headline) => {
      expect($headline.text()).to.include(`To-Do App`);
    });
  });
});

describe("Write/Read/Delete Task", () => {
  it("Writes 1 task", () => {
    cy.get("form#newTaskForm").within(() => {
      cy.get("#newTask-input").type("reply to emails");
      cy.root().submit();
    });
  });

  it("Counts number of tasks", () => {
    cy.get("#taskList").children().should("have.length", 1);
  });

  it("Reads task content", () => {
    cy.get("#taskList")
      .first()
      .get(".taskContent")
      .should("have.text", "reply to emails");
  });

  it("Deletes a task", () => {
    cy.get(deleteTaskButtonSelector).click();
  });
});

describe("Search functionality", () => {
  it("Writes 4 new tasks", () => {
    cy.addDummyTasks("form#newTaskForm", "#newTask-input", dummyTasks);
  });

  it("Counts number of tasks", () => {
    cy.get("#taskList").children().should("have.length", dummyTasks.length);
  });

  it("Reads task content", () => {
    cy.get("#taskList > div").each(($el, index, $list) => {
      const textContent = $el.find(".taskContent").text();
      expect(textContent).to.equals(dummyTasks[index]);
    });
  });

  it(`Searches task - ${dummyTasks[2]}`, () => {
    cy.get("#searchTask").type(dummyTasks[2]);
    cy.get("#taskList > div")
      .first()
      .find(".taskContent")
      .should("have.text", dummyTasks[2]);
  });
});
