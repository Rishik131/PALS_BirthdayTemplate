const birthday_person = document.querySelector(".name")
function renderBirthday(doc){
    let person_name = document.createElement('p');
    person_name.textContent = doc.data().name;
    birthday_person.appendChild(person_name);
}
db.collection('Birthdays').get().then((snapshot) =>{
    snapshots.docs.forEach(doc => {
        console.log(doc.data())
    })
})

//getting data
db.collection('Birthdays').orderBy().get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderBirhtday(doc);
    })
})