# firebase-push-example

A repository to test out using `firebase.database().ref().push`

The app is a simple form that accepts user input, pushes that input to the database, and adds a new row to a table in the view to show the data that has been input. Data from firebase is fetched on page load, and table rows are populated.

As an additional challenge, I decided to use native javascript APIs to perform DOM manipulation instead of jQuery.
