(function () {
  var current = 0;
  var athlete = data.athletes[current];
  var eventNum = 5;
  var medalsNum = 5;
  function updateText(id, text) {
    var elem = document.getElementById(id);
    elem.innerHTML = text;
  }
  function loadEvents() {
    var container = document.getElementById('events-container');
    container.innerHTML = '';
    for (var x = 1; x <= eventNum; x++) {
      var event = athlete['event-' + x];
      if (event) {
        if (data.events[event]) {
          event = data.events[event];
          var date = event.match(/\((.*?)\)/);
          date = date[0].replace('(', '').replace(')', '');
          date = new Date(date);
          var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][date.getMonth()];
          event = event.replace(/\((.*?)\)/, '');
          container.innerHTML += '<div class="olympic-date" data-desc="' + event + '" id="event-' + x + '"><span class="month">' + month + '</span><span class="date">' + date.getDate() + '</span></div>';
        }
      }
    }
    if (athlete['event-1']) {
      for (var x = 1; x <= 5; x++) {
        var container = document.getElementById('event-' + x);
        if (container) {
          container.onclick = function() {
            var event = this.getAttribute('data-desc');
            event = '<b>' + event.replace(':', ' - </b> ')
            document.getElementById('event-info').innerHTML = event;
          }
        }
      }
    } else {
      document.getElementById('event-info').innerHTML = 'No events have been scheduled!';
    }
  }
  function loadMedals() {
    var container = document.getElementById('medals-container');
    container.innerHTML = '';
    if (athlete['medal-1']) {
      for (var x = 1; x <= 5; x++) {
        var medal = athlete['medal-' + x];
        if (medal) {
          medal = '<b>' + medal.replace(':', ' - </b>');
          container.innerHTML += medal + '<br />';
        }
      }
    } else {
      container.innerHTML += 'No medals were found!';
    }
  }
  function loadLinks() {
    var container = document.getElementById('links-container');
    container.innerHTML = '';
    if (athlete['link-1']) {
      container.innerHTML += '<b>Read More:</b></br />';
      for (var x = 1; x <= 5; x++) {
        var link = athlete['link-' + x];
        var title = athlete['link-' + x + '-title'];
        if(title.length > 45) {
          title = title.substring(0, 45);
          title += '...';
        }
        if (link) {
          container.innerHTML += '<a href="' + link + '">' + title +'</a><br />';
        }
      }
    };
  }
  function loadProfile() {
    updateText('profile-name', athlete.name);
    updateText('profile-about', athlete.about);
    updateText('profile-hometown', athlete.hometown + ', UT (Age: ' + athlete.age + ')');
    document.getElementById('event-info').innerHTML = 'Click an event to see info!';
    document.getElementById('profile-picture').style.backgroundImage = 'url(' + athlete.photo + ')';
    for (var x = 0; x < 5; x++) {
      var num = ((x + 1) + current) % data.athletes.length;
      var preview = document.getElementsByClassName('profile-preview')[x];
      preview.style.backgroundImage = 'url(' + data.athletes[num].photo + ')';
      preview.setAttribute('data-val', num);
    }
    loadLinks();
    loadEvents();
    loadMedals();
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
    var height = document.getElementsByClassName('profile-preview')[0].offsetWidth + 'px';;
    for (var x = 0; x < 5; x++) {
      document.getElementsByClassName('profile-preview')[x].style.height = height;
    }
    height = document.getElementById('profile-picture').offsetWidth + 'px';
    document.getElementById('profile-picture').style.height = height;
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
  resize();
  loadProfile();
})();