window.onload = function() {
    alert('Page is loaded and script is running!');
    console.log('This is a message from the JavaScript file.');
  };

  if (window.location.pathname === '/') {
    // Redirect to 'index.html'
    window.location.pathname = '/index.html';
  }