describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3001/");

    // Find a link with a href attribute containing "about" and click it
    cy.get('a[href*="gis"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/gis");

    // The new page should contain a h1 with "About page"
    cy.get("h2").contains("Sectorisation");
  });
});
