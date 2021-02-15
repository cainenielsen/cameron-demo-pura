const usersList = document.getElementById("users-list");

getData(`/users/list-users`).then((data) => {
  data.forEach((user) => {
    const listItem = document.createElement("li");
    // const itemContent = document.createTextNode(``);
    // listItem.appendChild(itemContent);
    listItem.innerHTML = `<span>${user.firstName} ${user.lastName} | ${user.email}</span> | <a href="/users/user?id=${user.id}">View</a>`;
    document.body.insertBefore(listItem, usersList);
  });
});
