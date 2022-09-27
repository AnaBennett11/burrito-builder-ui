describe('App', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      fixture: "/sampleData.json",
    })
    .as('orders')
    cy.visit('http://localhost:3000')
    .wait('@orders')
    .its("response.body")
    .should("have.length", 3)
  });
  it('should take the user to the main page', () => {
   cy.get('form').should('have.length', 1)
     .get('input').should('have.length', 1)
     .get('button').should('have.length',13)
  })
  it("should render burrito form", () => {
    cy.get("form").should("contain", "Submit Order");
    cy.get("form").should("contain", "lettuce");
    cy.get("form").should("contain", "Nothing selected");
    cy.get("button").should("have.length", 13);
  });

  it("should be able to place an order", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders").as("order");
    cy.visit("http://localhost:3000");
    cy.get('input[type="text"]').type("Ana");
    cy.get("button").first().click();
    cy.get("p").should("contain", "Order: beans");
    cy.get(".submitButton").click();
    cy.wait("@order").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.name).to.eq("Ana");
      expect(response.body.ingredients).to.deep.eq(["beans"]);
    });
  })
  // it("should be able to save new idea as successful post", () => {
  //   cy.get('form')
  //     .get('input').should('have.length', 1).should('have.attr', "name")
  //     .get(".submitButton").click()
  //     .intercept("POST",'http://localhost:3001/api/v1/orders', {
  //       headers: { 'Content-Type': 'application/json' },
  //       statusCode: 201,
  //       body: { fixture: "sampleData.json"}
  //     })
  //     .intercept("GET", "http://localhost:3001/api/v1/orders", {
  //       statusCode: 200,
  //       fixture: "sampleData.json"
  //     })
  //     .as("orders")
  //     .wait('@orders')
  //     .its("response.body")
  // })
})