// show focus only when user is tabbing, you can find it's relevant CSS code in main.css
function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}
window.addEventListener('keydown', handleFirstTab);

// remove .html from url
var url = window.location.href;
if (url.indexOf('/index.html') > -1) {
  url = url.replace('index.html', '');
} else {
  url = url.replace('.html', '');
}
window.history.replaceState(null, null, url);

const myDate = new Date();
let hrs = myDate.getHours();
const sunFlowerEmoji = '<span>🌻</span>'
const sunEmoji = '<span>☀️</span>';
const moonEmoji = '<span>🌑</span>'

let greet;

if (hrs >= 4 && hrs < 12)
  greet = 'Good Morning' + sunFlowerEmoji;
else if (hrs >= 12 && hrs <= 17)
  greet = 'Good Afternoon' + sunEmoji;
else
  greet = 'Good Evening' + moonEmoji;

// greeting message
if (document.getElementById('greetingHuman') != null) {
  document.getElementById('greetingHuman').innerHTML = greet;
}

// add day or night class to body based on local time
if (document.body) {
  if (hrs >= 4 && hrs <= 17) {
    document.body.className = "light";
  } else {
    document.body.className = "dark";
  }
}

// change the title when the user moves to another tab
window.onblur = function () { document.title = 'Please come back 🥺'; }
window.onfocus = function () { document.title = 'Kevin Abou Hanna - Product Designer and Frontend Developer'; }

const getCurrentSpotifyMusic = () => {
  console.log('Testing: getCurrentSpotifyMusic try 1');

  /**
   * Note: API get **Access Token** https://developer.spotify.com/console/get-users-currently-playing-track/?market=from_token&additional_types=
   * 
   */
  fetch('https://api.spotify.com/v1/me/player/currently-playing?market=from_token', {

    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer BQCwFE4cV851xh5FylnIPXihYcA6GedOQ1C3FkHY21wY6IFHlOdAJkFwNn6mrrehPP9ON-tHieEGG4uZ0xkvtAOCO4FW0-oILVGXjUbhVFsNG287X-n0WZMeRHlUAb5glM5k-d-_p41PkAmFCm23SEwiyGuY4jkSA0HEl8ea'
    }
  })

    .then(response => response.json())
    .then(json => {
      console.log('Testing: getCurrentSpotifyMusic try 1', json)
      renderCurrentSpotifyMusic(json)

    }).catch(error => {
      // add status of not playing
      renderCurrentSpotifyMusic(null)
    })

}

const renderCurrentSpotifyMusic = (currentMusicData) => {
  const shortcodes = document.querySelectorAll('.currently-playing-section');
  if (currentMusicData === null || currentMusicData.is_playing === false) {
    // 
    alert('Not playing interface to be done...');
    shortcodes.forEach(element => {
      element.innerHTML = `
        <div>
        !!!! ___(___ !!!! Not playing... @Kevin TODO: use your own HTML and if you faced a problem open an issue on github repo and tag gk-git !!!! ___(___ !!!! 
        </div>
      `
    });
  } else {

    const artists = currentMusicData.item.artists;
    let artistsNames = '';
    const songName = currentMusicData.item.name;

    const albumCover = getAlbumCoverHref(currentMusicData)
    artists.forEach(artist => {
      artistsNames += artist.name;
    })
    shortcodes.forEach(element => {

      element.innerHTML = `
        <div class="currently-playing-container">
          ${albumCover === undefined ?
          '<img class="album-cover-empty-state" src="#noImage" />'
          : `
             <img class="album-cover" src="${albumCover}" />
             `
        }
          <div class="more-info">
            <span class="font-style-italic">Listening to</span>
            <span class="song-name">${songName}</span>
            <span class="artist-name">${artistsNames}</span>
          </div>
        </div>
      `
    });
  }

}

const getAlbumCoverHref = (currentMusicData) => {

  const albumCoverHref = currentMusicData?.item?.album?.images?.length ? currentMusicData.item.album.images[0] : '';

  return albumCoverHref.url;
}

getCurrentSpotifyMusic()