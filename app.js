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

// delete recipe from ui
const deleteRecipe = (id) => {
  const recipes = document.querySelectorAll('li');
  recipes.forEach((recipe) => {
    if (recipe.getAttribute('data-id') === id) {
      recipe.remove();
    }
  });
};

// Get documents
db.collection('recepies').onSnapshot((spanshot) => {
  spanshot.docChanges().forEach((change) => {
    const doc = change.doc;
    if (change.type === 'added') addRecipe(doc.data(), doc.id);
    else if (change.type === 'removed') deleteRecipe(doc.id);
  });
});

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
