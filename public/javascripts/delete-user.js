const deleteUser = function () {
  var id = null;

  if (params.has("id")) {
    id = params.get("id");
    console.log(id);
  }

  postData(`/users/delete-user`, { id: id }).then((data) => {
    if(data.status = 'successs') {
      window.location.assign('/users');
    } else {
      alert(data.message);
    }
  });
};
