(function () {
  var current = 0;
  var athlete = data.athletes[current];
  function updateText(id, text) {
    var elem = document.getElementById(id);
    elem.innerText = text;
  }
  function loadProfile() {
    updateText('profile-name', athlete.name);
    updateText('profile-about', athlete.about);
    document.getElementById('profile-picture').style.backgroundImage = 'url(' + athlete.photo + ')';
    for (var x = 0; x < 5; x++) {
      var num = (current + 1) + x;
      if ((num + 1) > data.athletes.length) num = num - data.athletes.length;
      var preview = document.getElementsByClassName('profile-preview')[x];
      preview.style.backgroundImage = 'url(' + data.athletes[num].photo + ')';
      preview.setAttribute('data-val', num);
    }
  }
  function router(selected) {
    var sections = ['about', 'medals', 'events'];
    for (var x = 0, max = sections.length; x < max; x++) {
      var button = document.getElementById(sections[x] + '-btn');
      var section = document.getElementById(sections[x] + '-section');
      button.classList.remove('current-menu-item');
      section.style.display = 'none';
    }
    selected.classList.add('current-menu-item');
    document.getElementById(selected.id.replace('-btn', '') + '-section').style.display = 'block';
  }
  function resize() {
    for (var x = 0; x < 5; x++) {
      var height = document.getElementsByClassName('profile-preview')[x].offsetWidth + 'px';
      document.getElementsByClassName('profile-preview')[x].style.height = height;
      height = document.getElementById('profile-picture').offsetWidth + 'px';
      document.getElementById('profile-picture').style.height = height;
    }
  }
  for (var x = 0; x < 3; x++) {
    document.getElementsByClassName('menu-item')[x].onclick = function () {
      router(this);
    }
  }
  for (var x = 0; x < 5; x++) {
    document.getElementsByClassName('profile-preview')[x].onclick = function() {
      var num = parseInt(this.getAttribute('data-val'));
      current = num;
      athlete = data.athletes[num];
      loadProfile();
    }
  }
  window.onresize = resize;
  loadProfile();
  resize();
})();