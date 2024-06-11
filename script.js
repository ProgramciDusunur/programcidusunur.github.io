
const ad = document.querySelector('body > div')
/*ad.style.display = 'none'*/
 /* Storing user's device details in a variable*/
let details = navigator.userAgent;  
/* Creating a regular expression 
containing some mobile devices keywords 
to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;  
/* Using test() method to search regexp in details
it returns boolean value*/
let isMobileDevice = regexp.test(details); 
if (isMobileDevice) {	
	//alert("You are using a Mobile Device");
} else {    
    //alert("You are using Desktop");
}

// GitHub repo bilgilerini almak için API URL'i
const apiUrl = 'https://api.github.com/repos/ProgramciDusunur/';

const repositoryList = ["Potential","Tic-Tac-Toe-AI", "Java-Chess-Engine"];
const repositoryDocumentIDList = ["cChessEngine", "ticTacToeAI", "javaChessEngine"];

function getGithubRepositoryStarCount(apiUrl, elementID, repositoryName) {
  // Fetch ile API'den bilgileri al
  fetch(apiUrl+repositoryName)
  .then(response => response.json())
  .then(data => {
    const starCount = data.stargazers_count; // Yıldız sayısı
    // HTML içeriğini güncelle    
    document.getElementById(elementID).textContent = "☆ "+starCount;
  })
  .catch(error => {
    console.error('GitHub API hatası:', error);
  });
}

function setRepositoryStarCounts(repoList, repositoryIDList) {
  for (let i = 0;i < 3;i++) {      
      getGithubRepositoryStarCount(apiUrl, repositoryIDList[i], repoList[i]);
  }
}

window.addEventListener('load', function() {
  setRepositoryStarCounts(repositoryList, repositoryDocumentIDList);
});




function discordIkon(parametre) {
	alert(parametre);	
}
function showDiscordAddress() {
  // div öğesi oluşturma
  const arkaPlan = document.createElement('div');  
  const discordAdres = document.createElement('div');
  const discordAdresBaslik = document.createElement('div');  
  arkaPlan.classList.add("discordBulanikArkaPlan");
  discordAdresBaslik.classList.add("discordAdresBaslik");
  discordAdres.classList.add("discordAdres");
  discordAdres.textContent = 'programcidusunur';
  discordAdresBaslik.textContent = 'Discord';

  // div öğesini sayfaya ekleme
  document.body.appendChild(arkaPlan);
  document.body.appendChild(discordAdres);
  document.body.appendChild(discordAdresBaslik);

  // div öğesini belirli bir süre sonra kaldırma
  setTimeout(() => {
    arkaPlan.remove();
    discordAdres.remove();
    discordAdresBaslik.remove();
  }, 7500); // 5 saniye sonra kaldır
}