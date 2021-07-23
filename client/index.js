/** @format */
// for (let i = 0; i < 10; i++) {
//   const item = document.createElement('li');
//   item.setAttribute('contenteditable', 'true');
//   item.innerHTML = 'Hi there';
//   item.addEventListener('input', updateValue);
//   const list = document.getElementById('list');
//   list.appendChild(item);
// }

document.addEventListener('DOMContentLoaded', () => {
  // for (let i = 0; i < 10; i++) {
  //   const item = document.createElement('li');
  //   item.setAttribute('contenteditable', 'true');
  //   item.innerHTML = 'Hi there';
  //   item.addEventListener('input', updateValue);
  //   const list = document.getElementById('list');
  //   list.appendChild(item);
  // }

  function getItems() {
    fetch('/list/getItems')
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        const { dbItems } = data;
        console.log('dbItems', dbItems);
        if (dbItems.length > 0) {
          for (let i = 0; i < dbItems.length; i++) {
            const listItem = document.createElement('li');
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('id', `delete-${i}`);
            deleteButton.addEventListener('click', deleteItem);
            deleteButton.innerHTML = 'Delete';
            listItem.setAttribute('id', `item ${i}`);
            listItem.setAttribute('contenteditable', `true`);
            listItem.innerHTML = dbItems[i].item;
            const list = document.getElementById('list');
            list.appendChild(listItem);
            list.appendChild(deleteButton);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  getItems();
  function updateValue() {
    console.log('hello');
  }

  function addItem(e) {
    // console.log('e', e);
    const input = document.getElementById('taskInput');
    const textBody = input.value;
    console.log('text', textBody);

    const item = document.createElement('li');
    item.setAttribute('contenteditable', 'true');
    item.innerHTML = textBody;
    item.addEventListener('input', updateValue);
    const list = document.getElementById('list');
    list.appendChild(item);
    console.log(typeof textBody);
    postToDB(textBody);
  }

  async function postToDB(item) {
    await fetch('/list/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  async function deleteItem(e) {
    console.log('e', e.target.id[e.target.id.length - 1]);
    const number = e.target.id[e.target.id.length - 1];
    const itemToDelete = document.getElementById(`item ${number}`);
    console.log(itemToDelete.innerHTML);
    const text = itemToDelete.innerHTML;
    await fetch('/list/deleteItem', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemToDelete: text }),
    });
    const list = document.getElementById('list');
    list.removeChild(itemToDelete);
    lsit.removeChild(e.target.id);
  }

  document.querySelector('#submit').addEventListener('click', addItem);
});
