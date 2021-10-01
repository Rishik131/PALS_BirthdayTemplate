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
  let downloadTemplate = document.createElement('span');
  let str = "<p>Just some <span>text</span> here</p>";

  li.setAttribute('data-id', doc.id);
  firstName.textContent = doc.data().FirstName;
  lastName.textContent = doc.data().LastName;
  email.textContent = doc.data().Email;
  dob.textContent = doc.data().DOB;
  phone.textContent = doc.data().PhoneNo;
  cross.textContent = 'x';
  downloadTemplate.textContent = "DOWNLOAD TEMPLATE";

  downloadTemplate.addEventListener('click', (e)=>{
    e.stopPropagation();
    saveTextAsFile(doc.data().FirstName);
  })

  // li.appendChild(firstName);
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



function saveTextAsFile(name)
{
  const birthdayTemplate = `
  <html>
  <body>
  <h1>Hello World ${name}</h1>
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
