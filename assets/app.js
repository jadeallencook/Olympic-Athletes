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
          container.onclick = function () {
            var event = this.getAttribute('data-desc');
            event = '<b>' + event.replace(':', ' - </b> ')
            document.getElementById('event-info').innerHTML = event;
            if ('ga' in window) {
              ga('send', 'event', 'Olympics Interactive', 'Event', this.getAttribute('data-desc'));
            }
          }
        }
      }
    } else {
      document.getElementById('event-info').innerHTML = 'No events have been scheduled';
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
      container.innerHTML += 'None';
    }
  }

  function loadLinks() {
    var container = document.getElementById('links-container');
    container.innerHTML = '';
    if (athlete['link-1']) {
      for (var x = 1; x <= 5; x++) {
        var link = athlete['link-' + x];
        var title = athlete['link-' + x + '-title'];
        if (link) {
          container.innerHTML += '<a target="_blank" href="' + link + '">' + title + '</a>';
        }
      }
    }
  }

  function loadProfile() {
    updateText('profile-name', athlete.name);
    updateText('profile-about', athlete.about);
    updateText('profile-hometown', athlete.hometown + ' (Age: ' + athlete.age + ')');
    document.getElementById('event-info').innerHTML = 'Click an event to see info';
    document.getElementById('profile-picture').style.backgroundImage = 'url(' + athlete.photo + ')';
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
    var previewHeight = document.getElementsByClassName('profile-preview')[0].offsetWidth + 'px';
    for (var x = 0; x < 14; x++) {
      document.getElementsByClassName('profile-preview')[x].style.height = previewHeight;
    }
    previewHeight = document.getElementById('profile-picture').offsetWidth + 'px';
    document.getElementById('profile-picture').style.height = previewHeight;
    var leftSideHeight = document.getElementById('left-side').offsetHeight + 'px';
    if (window.innerWidth <= 550) {
      document.getElementById('right-side').style.height = 'auto';
    } else {
      document.getElementById('right-side').style.height = leftSideHeight;
    }
  }
  for (var x = 0; x < 3; x++) {
    document.getElementsByClassName('menu-item')[x].onclick = function () {
      router(this);
      if ('ga' in window) {
        ga('send', 'event', 'Olympics Interactive', 'Menu Item', this.id);
      }
    }
  }
  for (var x = 0; x < 14; x++) {
    document.getElementsByClassName('profile-preview')[x].onclick = function () {
      var num = parseInt(this.getAttribute('data-val'));
      current = num;
      athlete = data.athletes[num];
      loadProfile();
      if ('ga' in window) {
        ga('send', 'event', 'Olympics Interactive', 'Athlete', this.getAttribute('data-val'));
      }
    }
    var num = ((x + 1) + current) % data.athletes.length;
    var preview = document.getElementsByClassName('profile-preview')[x];
    preview.style.backgroundImage = 'url(' + data.athletes[num].photo + ')';
    preview.setAttribute('data-val', num);
  }
  window.onresize = resize;
  loadProfile();
  resize();
})();