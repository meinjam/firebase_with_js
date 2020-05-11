const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe, id) => {
  let time = recipe.created_at.toDate();
  let html = `
    <li data-id="${id}">
        <div>${recipe.title}</div>
        <div>${time}</div>
        <button class="btn btn-danger">Delete</button>
    </li>
    `;
  list.innerHTML += html;
};

// Get documents
db.collection('recepies')
  .get()
  .then((snapshot) => {
    // when we have the data
    snapshot.docs.forEach((doc) => {
      // console.log(doc);
      // console.log(doc.id);
      addRecipe(doc.data(), doc.id);
    });
  })
  .catch((err) => console.log(err));

// Add documents
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const now = new Date();
  const recepies = {
    title: form.rec.value.trim(),
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };
  db.collection('recepies')
    .add(recepies)
    .then(() => console.log('recipe added.'))
    .catch((error) => console.log(error));
});

// Deleting documents
list.addEventListener('click', (e) => {
  // console.log(e);
  if (e.target.tagName === 'BUTTON') {
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('recepies')
      .doc(id)
      .delete()
      .then(() => console.log('recipe deleted.'));
  }
});
