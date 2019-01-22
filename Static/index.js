var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("openmodal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


$(document).ready(function () {

  var socket = io(); //1
  var user = $('.UserName').val(); //i was having trouble with ejs syntax in javascript so i used this
  var login = $('.loginbool').val(); //TEMPORARY SHITCODE CHANGE THIS WARNING WARNING SHITCODE SHITCODE
  var UserId = $('.UserId').val(); //TEMPORARY SHITCODE CHANGE THIS WARNING WARNING SHITCODE SHITCODE

  console.log(user);
  console.log(login);

  $(document).on('keypress', function (e) {//SEND MESSAGE WHEN ENTER IS PRESSED
    if (e.which == 13) {
      if (document.getElementById("MessageInput").value.length > 0) {
        var text = $('.messageform').val(); //set text values
        socket.emit("newmessage", { message: text, user: user });
        $('.messageform').val("");
      }
    }
  });

  $('.sendMessage').click(function () { //SEND MESSAGE FUNCTION
    var text = $('.messageform').val(); //set text values
    socket.emit("newmessage", { message: text, user: user });
    $('.messageform').val("");//reset input field
  })
  // $('#registerbtn').click(function () { //REGISTER FUNCTION
  //     var text = $('#nameinputreg').val();
  //     console.log(text)
  //     socket.emit("register", { user:text});
  //     $('#nameinputreg').val("");
  //     modal.style.display = "none";
  // })
  // $('#updatebtn').click(function () { //UPDATE USERNAME FUNCTION
  //     var text = $('#nameinputupdate').val();
  //     socket.emit("ChangedUsername", { user:text});
  //     $('#nameinputupdate').val("");
  //     modal.style.display = "none";
  // })
  $("#register").submit(function (event) {
    event.preventDefault();
    name = document.getElementById("nameinputreg").value;
    socket.emit("register", { user: name });
  })
  $("#updatename").submit(function (event) {
    event.preventDefault();
    var oldname = document.getElementById("UserName").value;
    var name = document.getElementById("nameinputupdate").value;
    console.log(oldname, name);
    closeAll();
    socket.emit("ChangeUsername", { UserId:UserId,newusername: name, oldusername: oldname });
    document.getElementById("UserName").value = name;
    document.getElementById("usernamegreet").innerHTML = name;
  })
  socket.on("UsernameChange", function (data) { //USERNAME CHANGE LISTENER
    var div = document.createElement('div'); //create div
    var namechange = document.createElement('p'); //create p 
    namechange.innerHTML = data.message; //p value is now the response from server side socket
    var container = document.getElementById("container"); //initialize container
    console.log(data); //good test
    namechange.className = 'namechange'; //set p class
    div.className = 'namechangediv'; //set div class
    div.appendChild(namechange); //append data to div
    container.appendChild(div); //append div to container
  });
  socket.on("NewUser", function (data) { //REGISTRATION LISTENER
    var div = document.createElement('div'); //create div
    var namechange = document.createElement('p'); //create p 
    namechange.innerHTML = data.message; //p value is now the response from server side socket
    var container = document.getElementById("container"); //initialize container
    console.log(data); //good test
    namechange.className = 'namechange'; //set p class
    div.className = 'namechangediv'; //set div class
    div.appendChild(namechange); //append data to div
    container.appendChild(div); //append div to container
  });
  socket.on('message', function (data) { //MESSAGE UPDATE LISTENER
    var div = document.createElement('div');
    var message = document.createElement('p');
    var author = document.createElement('p');
    author.innerHTML=data.user;
    message.innerHTML = data.message;
    var container = document.getElementById("container");
    console.log(data);
    message.className = 'message';
    author.className="messageauthor"
    if (data.user != user) {
      div.className = 'othermessagebox'; //blue box (You)
    }
    else {
      div.className = 'usermessagebox'; //grey box(other people)
    }
    div.appendChild(author);
    div.appendChild(message);  //append message to div
    container.appendChild(div); //append div to container
    updateScroll();

  });
  socket.on("initUser",function(data){//UPDATE VARIABLES FOR YOUR ACCCOUNT
    $('.UserName').val(data.name);
    $('.loginbool').val(true);
    $('.UserId').val(data.id);
  })
})

//NAVBAR FUNCTIONS BELOW

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeAll();
  }
}
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function closeAll(){
  modal.style.display = "none";
  document.getElementById("mySidenav").style.width = "0";
}
function updateScroll(){
  var element = document.getElementById("container");
  element.scrollTop = element.scrollHeight;
}
