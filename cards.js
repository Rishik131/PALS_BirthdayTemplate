const cafeList = document.querySelector("#birthday-list")

function renderCafe(doc){
  let li=document.createElement('li');
  let firstName = document.createElement('span')
  let lastName = document.createElement('span')

  li.setAttribute('data-id', doc.id);
  firstName.textContent = doc.data().FirstName;
  lastName.textContent = doc.data().LastName;

  li.appendChild(firstName);
  li.appendChild(lastName);

  cafeList.appendChild(li);
}

db.collection('Birthdays').get().then((snapshot) => {
  snapshot.docs.forEach(doc=>{
    renderCafe(doc);
  })
})