const getUser = function () {
  var id = null;

  if (params.has("id")) {
    id = params.get("id");
    console.log(id);
  }

  const userId = document.getElementById('user-id');
  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  const userStatus = document.getElementById('user-status');

  postData(`/users/get-user`, { id: id }).then((data) => {
    userId.innerHTML = data.id;
    userName.innerHTML = `${data.firstName} ${data.lastName}`;
    userEmail.innerHTML = data.email;
    userStatus.innerHTML = data.status;
  });
};

getUser();