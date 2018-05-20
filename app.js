// Function for loading each image via XHR
function imgLoad(data) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', data.image);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        arrayResponse[0] = request.response;
        arrayResponse[1] = data;
        resolve(arrayResponse);
      } else {
        reject(
          Error(
            "Image didn't load successfully; error code:" + request.statusText
          )
        );
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

// Pulled 'characters' from an external js to keep this page clean.
const charactersContainer = document.querySelector('.characters');
const loader = document.querySelector('.loader');

function generateCard(response) {
  const blob = response[0];
  const data = response[1];

  // Create image source from Blob Object
  const imageURL = window.URL.createObjectURL(blob);
  const html = `
    <div class="char">
      <div class="char-photo"><img class="char-photo" src="${imageURL}"></div>
      <div class="char-profile">
        <h3 class="char-name">${data.name}</h3>
        <div class="char-stats">
          <p class="char-item"><strong>Birth Year:</strong> ${
            data.birth_year
          }</p>
          <p class="char-item"><strong>Gender:</strong> ${data.gender}</p>
        </div>
      </div>
    </div>
  `;
  const frag = document.createRange().createContextualFragment(html);

  return frag;
}

// Build character cards on load
window.onload = function() {
  // load each set of image, alt text, name and caption
  for (let i = 0; i < characters.length; i++) {
    imgLoad(characters[i]).then(
      arrayResponse => {
        // Hide loading spinner when page loads
        if (loader) {
          loader.classList.add('hide');
        }

        const card = generateCard(arrayResponse);
        charactersContainer.appendChild(card);
      },
      Error => console.log(Error)
    );
  }
};
