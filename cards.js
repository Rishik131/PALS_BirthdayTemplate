const cafeList = document.querySelector("#birthday-list")
const form = document.querySelector("#add-birthday-form");

function renderCafe(doc){
  let li=document.createElement('li');
  let firstName = document.createElement('span')
  let lastName = document.createElement('span')
  let email = document.createElement('span')
  let dob = document.createElement('span')
  let phone = document.createElement('span')
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  firstName.textContent = doc.data().FirstName;
  lastName.textContent = doc.data().LastName;
  email.textContent = doc.data().Email;
  dob.textContent = doc.data().DOB;
  phone.textContent = doc.data().PhoneNo;
  cross.textContent = 'x';

  li.appendChild(firstName);
  li.appendChild(lastName);
  li.appendChild(email);
  li.appendChild(dob);
  li.appendChild(phone);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // DELETING DATA 
  cross.addEventListener('click', (e)=>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection("Birthdays").doc(id).delete();
  })
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
  form.firstName.value='';
  form.lastName.value='';
  form.email.value='';
  form.dob.value='';
  form.phone.value=''
})