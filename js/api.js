var base_url = "https://api.football-data.org/v2/";
var API_KEY ="5e4c1fbf6d82473f9ac66945f1d8cf6e";
function status(response){
	if(response.status!==200){
		console.log("Error : "+response.status);
		return Promise.reject(new Error(response.statusText));
	}else{
		return Promise.resolve(response);
	}
}

function json(response){
	return response.json();
}	

function error(response){
	console.log("Error : "+response);
}
var fetchApi = url => {
	return fetch(url, {
	headers: {
		'X-Auth-Token': API_KEY
		}
	});
}

function getLiga(){
fetchApi(base_url+"competitions/2002/standings")
	.then(status)
	.then(json)
	.then(data => {
	console.log(data);
});
}



function getLiga() {
	return new Promise(function(resolve, reject){
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  if("caches" in window){
	  caches.match(base_url + "competitions/" + idParam + "/standings").then(function(response){
		if(response){
			response.json().then(function(data){
			var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
		<span class="card-title">${data.competition.area.name}</span>
            </div>
            <div class="card-content">
              <span class="card-title">${data.competition.area.name}</span>
              <span class="card-title">${data.competition.name}</span>
              ${snarkdown(data.season.startDate)} - ${snarkdown(data.season.endDate)}
            </div>
          </div>
        `;
        var dut=`<table><thead><tr><th>Position</th><th></th><th>Teams</th>
        <th>Play</th><th>Won</th><th>Lost</th><th>Draw</th><th>Point</th></tr></thead><tbody>`;
        data.standings[0].table.forEach(function(article) {
        dut += `
              <tr><td>${article.position}</td>
                    <td><a href="./teams.html?id=${article.team.id}"><img src="${article.team.crestUrl}" height=50px/></a></td>
                    <td><a href="./teams.html?id=${article.team.id}">${article.team.name}</a></td>
                    <td>${article.playedGames}</td>
                    <td>${article.won}</td>
                    <td>${article.lost}</td>
                    <td>${article.draw}</td>
                    <td>${article.points}</td>
                    </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML+dut+"</tbody></table>";	
			resolve(data);	
			});
		}  
	  });
  }
  
  
  fetchApi(base_url + "competitions/" + idParam + "/standings")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
     // console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
		<span class="card-title">${data.competition.area.name}</span>
            </div>
            <div class="card-content">
              <span class="card-title">${data.competition.area.name}</span>
              <span class="card-title">${data.competition.name}</span>
              ${snarkdown(data.season.startDate)} - ${snarkdown(data.season.endDate)}
            </div>
          </div>
        `;
        var dut=`<table><thead><tr><th>Position</th><th></th><th>Teams</th>
        <th>Play</th><th>Won</th><th>Lost</th><th>Draw</th><th>Point</th></tr></thead><tbody>`;
        data.standings[0].table.forEach(function(article) {
        dut += `
              <tr><td>${article.position}</td>
                    <td><a href="./teams.html?id=${article.team.id}"><img src="${article.team.crestUrl}" height=50px/></a></td>
                    <td><a href="./teams.html?id=${article.team.id}">${article.team.name}</a></td>
                    <td>${article.playedGames}</td>
                    <td>${article.won}</td>
                    <td>${article.lost}</td>
                    <td>${article.draw}</td>
                    <td>${article.points}</td>
                    </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML+dut+"</tbody></table>";
      resolve(data);
    });
    
  }); //end of Promise
} //end of function


function getInfoClubById() {
  return new Promise(function(resolve, reject){
	  
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
   if("caches" in window){
	  caches.match(base_url + "competitions/" + idParam + "/standings").then(function(response){
		if(response){
			response.json().then(function(data){
				console.log(data);
			var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
				<img src="${data.crestUrl}" height=100px />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <span class="card-title">${data.address}</span>
              <p>${data.phone}
              ${snarkdown(data.venue)}
              ${snarkdown(data.email)}</p>
              <a href=${data.website}>${snarkdown(data.website)}</a>
            </div>
          </div>
        `;
        var dut=`<table><thead><tr><th>Name</th><th>Position</th>
        <th>Nationality</th><th>countryOfBirth</th><th>dateOfBirth</th></thead><tbody>`;
        data.squad.forEach(function(article) {
        dut += `
              <tr><td>${article.name}</td>
                    <td>${article.position}</td>
                    <td>${article.nationality}</td>
                    <td>${article.countryOfBirth}</td>
                    <td>${article.dateOfBirth}</td>
                    </tr>
           `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML+dut+"</tbody></table>";	
			resolve(data);	
			});
		}  
	  });
  }
   
   fetchApi(base_url + "teams/" + idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
				<img src="${data.crestUrl}" height=100px />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <span class="card-title">${data.address}</span>
              <p>${data.phone}
              ${snarkdown(data.venue)}
              ${snarkdown(data.email)}</p>
              <a href=${data.website}>${snarkdown(data.website)}</a>
            </div>
          </div>
        `;
        var dut=`<table><thead><tr><th>Name</th><th>Position</th>
        <th>Nationality</th><th>countryOfBirth</th><th>dateOfBirth</th></thead><tbody>`;
        data.squad.forEach(function(article) {
        dut += `
              <tr><td>${article.name}</td>
                    <td>${article.position}</td>
                    <td>${article.nationality}</td>
                    <td>${article.countryOfBirth}</td>
                    <td>${article.dateOfBirth}</td>
                    </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML+dut+"</tbody></table>";
      resolve(data);
    });
    
   }); //end of Promise
}// end of function

function getSavedClubs() {
  getAll().then(function(clubs) {
    console.log(clubs);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    clubs.forEach(function(club) {
      var description = club.address;

      articlesHTML += `
                  <div class="card">
                    <a href="./teams.html?id=${club.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${club.crestUrl}" height=200px width=200px/>
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${
                        club.name
                      }</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

//<img src="${club.crestUrl}" height=200px width=200px/>
function getSavedClubById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(club) {
    articleHTML = '';
    var articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
       <img src="${club.crestUrl}" height=200px width=200px/>      
      </div>
      <div class="card-content">
        <span class="card-title">${club.name}</span>
        ${snarkdown(club.address)}
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}
