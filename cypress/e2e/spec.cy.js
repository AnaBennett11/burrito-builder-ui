describe('App', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      fixture: "/sampleData.json",
    })
    .as('orders')
    cy.visit('http://localhost:3000')

  });
 
  it('should render an order form', () => { 
  cy.get("form")
    .should("exist")
    .get("input")
    .get(".ingredient-buttons")
    .should("have.length", 12)
    .should("contain", "steak")
    .get("p")
    .should("contain", "Order:")
    .get("h4")
    .should(
      "contain",
      "Please enter a name and select at least one ingredient for your burrito!")
    });

  it('should show the stub data on page load', () => {
    cy.wait("@orders")
      .get(".order")
      .should("exist")
      .should("have.length", 1)
      .get(".order-name")
      .should("contain", "Pat")
      .get(".ingredients")
      .should("contain", 
        "beans",
      );
    })
 


  it("should be able to place an order", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders").as("order");
    cy.visit("http://localhost:3000");
    cy.get('input[type="text"]').type("Ana");
    cy.get("button").first().click();
    cy.get("p").should("contain", "Order: beans");
    cy.get(".submit-button").click();
    cy.wait("@order").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.name).to.eq("Ana");
      expect(response.body.ingredients).to.deep.eq(["beans"]);
    });
  })

})