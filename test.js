'use strict'
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDKzVFMiuAJQ1gmG0nT5GvVKIJmq-ZVDNE',
  authDomain: 'testing-push-ecff6.firebaseapp.com',
  databaseURL: 'https://testing-push-ecff6.firebaseio.com',
  storageBucket: 'testing-push-ecff6.appspot.com',
  messagingSenderId: '1018766950413'
}
firebase.initializeApp(config)

// Create a variable to reference the database
var database = firebase.database()

// onclick listener for the submit button
document.querySelector("input[name='submit']").onclick = function (event) {
  event.preventDefault()
  var name = document.querySelector("input[name='name']").value
  var email = document.querySelector("input[name='email']").value
  var rate = document.querySelector("input[name='rate']").value
  database.ref('users').push({
    name: name,
    email: email,
    rate: rate
  })
}

/*
  @param {string} name
  @param {string} email
  @param {string} rate
  @return {Element} DOM node
*/
const generateTableRow = function (name, email, rate, key) {
  // an alternative to this approach would be to set the innerHTML of the tr to an
  // html string that represented the child td's. This is faster, though.
  const tableRow = document.createElement('tr')
  const col1 = document.createElement('td')
  col1.appendChild(document.createTextNode(name))
  const col2 = document.createElement('td')
  col2.appendChild(document.createTextNode(email))
  const col3 = document.createElement('td')
  col3.appendChild(document.createTextNode(rate))

  // create button, and attach callback to button.
  const col4 = document.createElement('td')
  const btn = document.createElement('button')
  btn.appendChild(document.createTextNode('Delete'))
  col4.appendChild(btn)

  btn.onclick = function () {
    // delete from firebase after clicking delete button
    database.ref('users').child(key).set(null)
  }

  // using "once" prevents unnecessary firebase listeners from remaining attached after
  // a deletion occurs.
  database.ref('users').once('child_removed', function () {
    tableRow.parentNode.removeChild(tableRow) // need to call on parentNode
  })

  tableRow.appendChild(col1)
  tableRow.appendChild(col2)
  tableRow.appendChild(col3)
  tableRow.appendChild(col4)
  return tableRow
}

// any data in the database will be added to the table on page load
database.ref('users').on('child_added', function (childSnapshot) {
  const snapshotVals = childSnapshot.val()
  const snapshotKey = childSnapshot.key
  if (snapshotVals) {
    const name = snapshotVals.name
    const email = snapshotVals.email
    const rate = snapshotVals.rate
    const newRow = generateTableRow(name, email, rate, snapshotKey)
    document.querySelector('tbody').appendChild(newRow)
  }
})

