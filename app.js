const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe) => {
  let time = recipe.created_at.toDate();
  let html = `
    <li>
        <div>${recipe.title}</div>
        <div>${time}</div>
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
      // console.log(doc.data());
      addRecipe(doc.data());
    });
  })
  .catch((err) => {
    console.log(err);
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
