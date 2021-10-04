const birthdayList = document.querySelector("#birthday-list")
const form = document.querySelector("#add-birthday-form");

function renderBirthday(doc){
  let li=document.createElement('li');
  let firstName = document.createElement('span')
  let lastName = document.createElement('span')
  let email = document.createElement('span')
  let dob = document.createElement('span')
  let phone = document.createElement('span')
  let cross = document.createElement('div');
  let downloadTemplate = document.createElement('button');

  li.setAttribute('data-id', doc.id);
  firstName.textContent = `First Name : ${doc.data().FirstName}`;
  lastName.textContent = `Last Name : ${doc.data().LastName}`;
  email.textContent = `Email ID : ${doc.data().Email}`;
  dob.textContent = `Date of birth : ${doc.data().DOB}`;
  phone.textContent = `Phone Number : ${doc.data().PhoneNo}`;
  cross.textContent = 'x';
  downloadTemplate.textContent = "DOWNLOAD TEMPLATE";

  downloadTemplate.addEventListener('click', (e)=>{
    e.stopPropagation();
    saveTextAsFile(doc.data().FirstName);
  })

  li.appendChild(firstName);
  li.appendChild(lastName);
  li.appendChild(email);
  li.appendChild(dob);
  li.appendChild(phone);
  li.appendChild(cross);
  li.appendChild(downloadTemplate);

  birthdayList.appendChild(li);

  // DELETING DATA 
  cross.addEventListener('click', (e)=>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection("Birthdays").doc(id).delete();
  })
}


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
});




function saveTextAsFile(name)
{
  const birthdayTemplate = `
  <html>
    <body>
      <style>
      *{
        margin: 0;
        padding: 0;
      }
      body{
        background: rgb(0,142,249);
        background: linear-gradient(127deg, rgba(0,142,249,1) 25%, rgba(19,158,249,1) 33%, rgba(88,216,251,1) 45%, rgba(94,221,251,1) 48%, rgba(83,215,251,1) 52%, rgba(26,182,254,1) 63%, rgba(0,167,255,1) 71%);
      }
      h1{
        color: white;
        text-align: center;
      }
      div{
        margin: auto;
        width: 50%;
        height: 100vh;
      }
      .nm{
        border: 10px solid white;
        border-radius: 25px;
      }
      </style>
      <div class="nm">
      <img src="images/confetti.png" alt="confetti">
      <h1>HAPPY BIRTHDAY!</h1>
      <h1>${name}</h1>
      </div>
    </body>
  </html>`;
    var textFileAsBlob = new Blob([birthdayTemplate], {type:'text/plain'});
    var fileNameToSaveAs = `${name}.html`;
      var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

// REAL TIME LISTENER 
db.collection("Birthdays").orderBy("FirstName").onSnapshot(snapshot=>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    if(change.type == 'added'){
      renderBirthday(change.doc);
    }else if(change.type=='removed'){
      let li = birthdayList.querySelector('[data-id='+change.doc.id + ']');
      birthdayList.removeChild(li);
    }
  })
})
