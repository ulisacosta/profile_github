const APIURL = 'https://api.github.com/users/'
const search_user = document.getElementById("search_user");

const main = document.querySelector("main");
const form = document.querySelector("form");


async function getUser(user) {
  try {
     const { data } = await axios(APIURL + user);
     createProfile(data)
     getRepos(user)

  } catch (err) {
   if(err.response.status == 404) {
      createError('No find this user')
  }
  }
}

async function getRepos(user){
   try { 
      const {data} = await axios(APIURL + user + "/repos?sort=created") 
      createRepo(data)
   } 
   catch (err) {
      if(err.response.status == 404) {
         createError('No find repos')
     }
   
}
}

function createError(msgError){
   const html = 
   `  <div class="">
   <h2 class="text-white"> ${msgError} </h2>
   </div>
   `
   main.innerHTML = html
}





function createProfile(user) {
   const userName = user.name || user.login
      const html =
      `
      <div class="">

      <div class="">
      <img src="${user.avatar_url}"  alt="avatar" class="rounded-lg">  </img>
      </div>
         <div class="h-1/4 w-2/4 ">
      <h2 class="text-white"> ${userName}  </h2>
      <h2 class="text-white"> ${user.bio}  </h2>
      <h2 class="text-white"> ${user.followers}  </h2>
      <h2 class="text-white"> ${user.following}  </h2>
      <h2 class="text-white"> ${user.public_repos}  </h2>
      
      </div>
      
      <div id="repos">

      </div>
      </div>
      `; 
   main.innerHTML = html
}

function createRepo(repos){
   const divRepo = document.getElementById("repos");
   repos
   .slice(0,4)
   .forEach(repo => {
      const repoElement = document.createElement('a')
      repoElement.classList.add('bg-slate-600')
      repoElement.href = repo.html_url
      repoElement.target = '_blank'
      repoElement.innerText = repo.name

      divRepo.appendChild(repoElement)
   })
}

form.addEventListener("submit", (e) => {
   e.preventDefault();
   const username = search_user.value
   if(username){
      getUser(username)
      search_user.value = ""
   }
});
