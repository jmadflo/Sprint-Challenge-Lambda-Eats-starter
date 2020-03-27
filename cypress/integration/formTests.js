describe("My pizza form tests", () => {
    beforeEach(() => {
        cy.visit("localhost:3000/pizza")
    })

    it("test order", () => {

        //add name string to input
        cy.get('input[name="name"]')
            .type("Darth Vader")
            .should("have.value", "Darth Vader")

        //select pizza slice
        cy.get("#size")
        .select("Large")
        .should("have.value", "Large");

        //add tooppings
        cy.get("#pepperoni")
        .check()
        .should("be.checked");

        cy.get("#mushrooms")
        .check()
        .should("be.checked");

        //click add order button to submit form

        cy.get("#submit")
        .click();
    })
})