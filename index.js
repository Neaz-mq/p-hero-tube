const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  console.log(data.data);
 


  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `            
           
           <a onclick="handleLoadContent('${category.category_id}')"><button
                        class="btn btn-sm  bg-red-500 px-6 py-2 text-white rounded bg-none capitalize ">${category.category}</button></a>                         
                        
                        `;

    tabContainer.appendChild(div);
  });
};

const handleLoadContent = async (categoryId) => {
  console.log(categoryId);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );

  const data = await response.json();
  console.log(data.data[0]);

  
  const drawing = document.getElementById('drawing');

  if(data.data.length === 0){
    drawing.classList.remove('hidden');
  }
  else{
    drawing.classList.add('hidden');

  }

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";
 

  data.data?.forEach((videos) => {
    console.log(videos);

    const second = videos?.others?.posted_date;
    const hours = Math.floor(second / 3600);
    const remainingSeconds = second % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    const convertingHourMinute = `${hours} hrs ${minutes} min ago`;

    const div = document.createElement("div");
    div.innerHTML = `
          <div class="card bg-base-100 shadow-xl">
          <div class="relative">
          <div>
          <figure>
            <img class = "h-48 w-full"
              src=${videos?.thumbnail}
            />
          </figure>
          </div>
          <div class="absolute right-7 bottom-6 bg-black  pl-2 pr-3 ml-2">
          <p class="text-white ml-2">${videos?.others?.posted_date ? convertingHourMinute : ""}</p>
          </div>
          </div>
          <div class="flex gap-3 mt-5">
          <div class="avatar">
          <div class="w-14 rounded-full">
          <img
            src=${videos.authors[0].profile_picture}
          />
          
        </div>
        </div>
        <h2 class="card-title">
        ${videos.title}
        </div>
          
       </h2>
          <div class="card-body"> 
          <div class="flex" > 
            <p class= "-mt-6 ml-9 ">
            ${videos.authors[0].profile_name}</p>
          
            <p class= "-mt-5 mr-14">${videos.authors[0].verified ? '<img src="./images/verify.jpg" alt="Verified">' : ''} </p>
            </div>
            <h3 class= " views ml-9 "> ${videos.others.views} views</h3>           
              </div>        
            </div>
              
          `;

    cardContainer.appendChild(div);
  });

};


document.getElementById('sortButton').addEventListener('click', function () {
  sortCardsByViews();
});

function sortCardsByViews() {
  const cardContainer = document.getElementById('card-container');
  const cards = Array.from(cardContainer.getElementsByClassName('card'));

  cards.sort(function (cardA, cardB) {
    const viewsA = parseInt(cardA.querySelector('.views').textContent);
    const viewsB = parseInt(cardB.querySelector('.views').textContent);
    return viewsB - viewsA;
  });

  cardContainer.innerHTML = '';
  cards.forEach(function (card) {
    cardContainer.appendChild(card);
  });
}

handleCategory();
handleLoadContent("1000");
