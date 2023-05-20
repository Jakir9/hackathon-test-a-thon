// A user visits the site, adds a new todo to the list, deletes a todo from the list, 
// refreshes the page and the todos are still persisted/saved.

//create end2end test for this user journey 

//install playwright ✅
//import all the functions ✅
//navigate 2 page and verify title matches the title of todos ✅
//type into the input field - verify this works using assertion ✅
//select a date - verify that date input field is filled ✅
// click on create ✅
//verify that this creates a todo list item ✅
//delete todo list item - verify that the todo list element has been deleted
//refresh the page and verfiy that any todos will still be shown.

const { test, expect } = require('@playwright/test');

//import * as todosApi from "../front_end/js/todos-api.js";
// import * as index from "../front_end/js/index.js";
//import * as view from "../front_end/js/view.js";

test ("navigating to page", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page).toHaveTitle(/Todos/);
}
)

test ("Typing into input field", async ({ page }) => {
    await page.goto("http://localhost:3000");
    let input = await page.getByLabel(" Task ");
    input.type("Wash my Dog");
    await expect(input).toHaveValue("Wash my Dog");
}
)

test ("Typing into calendar field", async ({ page }) => {
    await page.goto("http://localhost:3000"); //page loaded
    await page.getByLabel(" Completion date").fill("2021-09-01"); //input field filled
    await expect(page.getByLabel(" Completion date")).toHaveValue("2021-09-01"); //assertion
}
)

test ("Typing into input and filling date and clicking to create todo list item", async ({ page }) => {
    await page.goto("http://localhost:3000"); //page loaded
    let input = await page.getByLabel(" Task "); 
    let inputText = "Wash my Dog!";
    await input.type(inputText); //adds to the list
    await page.getByLabel(" Completion date").fill("2040-01-01"); //input field filled
    await expect(page.getByLabel(" Completion date")).toHaveValue("2040-01-01"); //assertion
    //click button to add to list
    //("#new-todo > button").click();
    await page.getByRole("button").click();
    //verify that the todo list item has been added
    await expect(page.getByRole("list").last()).toHaveText(new RegExp(inputText));
}
)

test ("Deleting created todo list item", async ({ page }) => {
    await page.goto("http://localhost:3000"); //page loaded
    let input = await page.getByLabel(" Task "); 
    let inputText = "Wash my Dog!";
    await input.type(inputText); //adds to the list
    await page.getByLabel(" Completion date").fill("2040-01-01"); //input field filled
    //click button to add to list

    await page.getByTitle("Create a new todo").click();

    let input2 = await page.getByLabel(" Task "); 
    let inputText2 = "Wash my Cat!";
    await input2.type(inputText2); //adds to the list
    await page.getByLabel(" Completion date").fill("2040-01-01"); //input field filled
    //click button to add to list
    await page.getByTitle("Create a new todo").click();

   // let listLength1 = record the size of list before deleting
   // let listLength1 = page.getByRole("list").children().length();
    

    await page.getByTitle("Delete this todo").nth(0).click();  //deletes the first todo list item
      // let listLength1 = record the size of list after deleting
   // let listLength2 = page.getByRole("list").children().length();

    // Check that the todo list item has been deleted
    await expect((page.getByRole("list").nth(0)).toHaveText(new RegExp(inputText)) && listLength1 !== listLength2);
})

//    // Wash my dog(0) 0nth
//     Wash my dog(1)  0nth
//     size1 != size2
//     list size 2