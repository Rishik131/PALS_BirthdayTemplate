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
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Birthstone&display=swap" rel="stylesheet">
    </head>
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
        position: absolute;
        color: white;
        text-align: center;
        font-family: 'Birthstone', cursive;
        font-size: 80px;
        top: 0px;
      }
      .container{
        position: relative;
        z-index:0;
        margin: auto;
        margin-top: 30px;
        width: 50%;
        height: 100vh;
        max-height: 1000px;
        border: 10px solid white;
        border-radius: 25px;
        overflow: hidden;
      }
      .wish{
        left: 20%;
      }
      .name{
        top: 70px;
        left: 35%;
      }
      .bg{
        position: relative;
        z-index: -1;
        margin: auto;
        width: 100%;
      }
      .img1{
        position: absolute;
        width: 125px;
        height: auto;
        left: 23%;
        top: 200px;
      }
      .img2{
        position: absolute;
        width: 145px;
        height: auto;
        left: 26%;
        top: 320px;
      }
      .img3{
        position: absolute;
        width: 140px;
        height: auto;
        top: 170px;
        left: 67%;
      }
      .img4{
        position: absolute;
        width: 100px;
        height: auto;
        top: 290px;
        left: 64%;
      }
      .img5{
        position: absolute;
        width: 120px;
        height: auto;
        top: 350px;
        left: 67%;
      }
      </style>
      <div class="container">
      <img src="PALS_BirthdayTemplate/images/confetti.png" alt="confetti" class="bg">
      <h1 class="wish">HAPPY BIRTHDAY!</h1>
      <h1 class="name">${name}</h1>
      </div>
      <img src="https://github.com/Rishik131/PALS_BirthdayTemplate/blob/main/images/left_top.png?raw=true" alt="left_top" class="img1">
      <img src="https://github.com/Rishik131/PALS_BirthdayTemplate/blob/main/images/Left_bottom.png?raw=true" alt="Left_bottom" class="img2">
      <img src="https://github.com/Rishik131/PALS_BirthdayTemplate/blob/main/images/Right_top.png?raw=true" alt="Right_top" class="img3">
      <img src="https://github.com/Rishik131/PALS_BirthdayTemplate/blob/main/images/Right_middle.png?raw=true" alt="Right_middle" class="img4">
      <img src="https://github.com/Rishik131/PALS_BirthdayTemplate/blob/main/images/right_bottom.png?raw=true" alt="right_bottom" class="img5">
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
