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
  const birthdayTemplate = String.raw `
  <html>
    <head>
    </head>
    <body>
      <style>
      *{
        margin: 0;
        padding: 0;
      }
      h1{
        text-align: center;
        color: white;
        font-size: 40px;
      }
      .container1{
        margin: auto;
        margin-top: 35px;
        width: 35%;
        background-color: #6CF0FF;
        padding: 20px;
      }
      .container2{
        border: 2px solid white;
        height: 85%;
        max-height: 700px;
        padding: 2px;
        outline: 2px solid white;
        outline-offset: 2.5px;
      }
      .wish{
        margin-top: 70px;
      }
      .rect1{
        position: absolute;
        background-color: #FF4B6B;
        width: 140px;
        height: 30px;
        top: 93px;
        left: 58%;
      }
      .rect2{
        position: absolute;
        background-color: #FF4B6B;
        width: 140px;
        height: 30px;
        top: 230px;
        left: 32.75%;
      }
      .big{
        position: absolute;
        width: 150px;
        height: auto;
        top: 380px;
        left:60%;
      }
      .small{
        position: absolute;
        width: 120px;
        height: auto;
        top: 500px;
        left:55%;
      }
      </style>
      <div class="container1">
        <div class="container2">
          <div class="text">
            <h1 class="wish">HAPPY BIRTHDAY!</h1>
            <h1 class="name">${name}</h1>
          </div>
        </div>
      </div>
      <div class="rect1"></div>
      <div class="rect2"></div>
      <img src="https://github.com/Rishik131/PALS_BirthdayTemplate/blob/main/images/Big_Balloon.png?raw=true" alt="Big_Balloon" class="big">
      <img src="https://github.com/Rishik131/PALS_BirthdayTemplate/blob/main/images/Small_balloon.png?raw=true" alt="Small_balloon" class="small">
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
