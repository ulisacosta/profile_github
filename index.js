const APIURL = 'https://api.github.com/users/'
const search_user = document.getElementById("search_user");

const main = document.querySelector("main");
const form = document.querySelector("form");

async function getUser(user) {
  try {
     const { data } = await axios(APIURL + user);
     createProfile(data)

  } catch (error) {
   
  }


}

function createProfile(user) {
   const userName = user.name || user.login
      const html =` <div class="h-1/4 w-1/4"> 
      <h2 class=""> ${userName}  </h2>
      </div>
      `; 
   main.innerHTML = html
}

form.addEventListener("submit", (e) => {
   e.preventDefault();
   const username = search_user.value
   if(username){
      getUser(username)
      search_user.value = ""
   }
});
