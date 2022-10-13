import { dummyTasks } from "../utils";

before(() => cy.visit("http://localhost:5173/"));

describe("Sort List", () => {
    it("Writes 4 new tasks", () => {
        cy.addDummyTasks("form#newTaskForm", "#newTask-input", dummyTasks);
    });

    it("Sort A->Z", () => {
        cy.get("#sortList").click();

        dummyTasks.sort();

        cy.get("#taskList > div").each(($el, index, $list) => {
            const textContent = $el.find(".taskContent").text();
            expect(textContent).to.equals(dummyTasks[index]);
        });
    });

    it("Sort Z->A", () => {
        cy.get("#sortList").click();

        dummyTasks.reverse();

        cy.get("#taskList > div").each(($el, index, $list) => {
            const textContent = $el.find(".taskContent").text();
            expect(textContent).to.equals(dummyTasks[index]);
        });
    });
});
