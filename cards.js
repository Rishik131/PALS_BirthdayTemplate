const cafeList = document.querySelector("#birthday-list")
const form = document.querySelector("#add-birthday-form");

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

// GETTING DATA 
db.collection('Birthdays').get().then((snapshot) => {
  snapshot.docs.forEach(doc=>{
    renderCafe(doc);
  })
})

// SAVING DATA 
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  db.collection("Birthdays").add({
    FirstName: form.firstName.value,
    LastName: form.lastName.value,
    Email: form.email.value,
    DOB: form.dob.value,
    PhoneNo: form.phone.value,
  });
})