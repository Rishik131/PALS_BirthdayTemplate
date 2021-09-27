db.collection('Birthdays').get().then((snapshot) => {
  console.log(snapshot.docs)
})
