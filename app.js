const API_URL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const content = document.getElementById('content');

getUser("Github");

async function getUser(userName) {
    const response = await fetch(API_URL + userName);
    const userData = await response.json();
    console.log('data', userData);
    createUserProfile(userData);
    getUserRepository(userName)
}

async function getUserRepository(userName) {
    const response = await fetch(API_URL + userName + '/repos');
    const data = await response.json();
    userRepository(data);
}


function createUserProfile(user) {
    const userProfile = `
    <div class="profile-card">
    <div class="avatar-container">
        <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
    </div>
    <div class="user-bio">
        <h3>${user.name}</h3>
        <p class="followers">${user.followers} Followers</p>
        <p>${user.bio}</p>
        <p class="user-repository">${user.public_repos} Repositories</p>
        </div>
        <hr>
        <div id="repository"></div>
    </div>
`;
    content.innerHTML = userProfile; // adds userProfile html code to content page
  }

  function userRepository(repos) {
    const resposItems = document.getElementById('repository');
    console.log('repos data: ', repos);

    repos.slice(0,12).forEach(repo => {
        const respoItems = document.createElement('a');
        respoItems.classList.add('repo');

        respoItems.href = repo.html_url;
        respoItems.target = "_blank";
        respoItems.innerText = repo.name;

        resposItems.appendChild(respoItems);
    });
  }

  form.addEventListener('submit', e => {
      e.preventDefault();

      const userName = search.value;
      if(userName) {
        getUser(userName);
        search.value = ""; // clean search box
      }

  });