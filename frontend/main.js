$(function(){
  var backendHostUrl = 'https://backend-dot-andy-playground-development.uc.r.appspot.com';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    
  };
 
  // This is passed into the backend to authenticate the user.
  var userIdToken = null;

  // Firebase log-in
  function configureFirebaseLogin() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $('#logged-out').hide();
        var name = user.displayName;

        var welcomeName = name ? name : user.email;

        user.getIdToken().then(function(idToken) {
          userIdToken = idToken;
          $('#user').text(welcomeName);
          $('#logged-in').show();
        });

      } else {
        $('#logged-in').hide();
        $('#logged-out').show();
      }
    });
  }

  function configureFirebaseLoginWidget() {
    var uiConfig = {
      'signInSuccessUrl': '/',
      'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
        //, firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url
      'tosUrl': '<your-tos-url>',
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  var signOutBtn =$('#sign-out');
  signOutBtn.click(function(event) {
    event.preventDefault();

    firebase.auth().signOut().then(function() {
      console.log("Sign out successful");
    }, function(error) {
      console.log(error);
    });
  });

  var testBtn = $('#test-btn');
  testBtn.click(function(event) {
    event.preventDefault();

    $.ajax(backendHostUrl + '/api/valid', {
      headers: {
        'Authorization': 'Bearer ' + userIdToken
      },
      method: 'POST',
      data: JSON.stringify({'message': 'note test'}),
      contentType : 'application/json'
    }).then(function(ret){
      // Refresh notebook display.
      console.log(ret);
    });
  });

  configureFirebaseLogin();
  configureFirebaseLoginWidget();

});
