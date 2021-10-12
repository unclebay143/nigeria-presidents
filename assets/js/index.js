// fetch the json from file/endpoint
const fetchPresidentData = async () => {
    const response = await fetch("./assets/js/data.json");
    const data = await response.json();
    //
    return data;
};

// Generate random president profile
async function generateRandomPresidentProfile() {
    const { presidents } = await fetchPresidentData();

    // Generate a random number
    const randomNumber = Math.floor(Math.random() * (presidents.length - 2));

    const randomPresident = presidents[randomNumber];

    // eslint-disable-next-line camelcase
    const { no, imgsrc, name, from, to, born, party, extra_information } =
        randomPresident;

    const randomPresidentCard = `

       <div class="card-image" onClick="viewMore('${no}')">
         <img
           load="lazy"
           src="./assets/portraits/${imgsrc}"
           alt="${name}"
           width="100%"
           height="100%"
         />
        </div>
        <br>
        <div class="details">
          <div class="name"> President ${name}</div>
          <div class="tenure">From ${from} to ${to}</div>
          <div class="born">Born: ${born}</div>
          <div class="party">Party: ${party}</div>
            <div class="bio">
            ${
                extra_information[0].bio
                    ? `Bio: ${extra_information[0].bio.slice(
                          0,
                          300
                      )}...click image to read more`
                    : "Bio Not available "
            }
            </div>
            <button class="random-button" onclick="generateRandomPresidentProfile()">Random</button>
          </div>
        </div>
      </div>

 `;

    document.querySelector(".random-president").innerHTML = randomPresidentCard;
}

generateRandomPresidentProfile();

// render the president profile to the ui
const renderPresidentProfile = async (presidents) => {
    // profile card parent div
    const profileCard = document.querySelector(".profile-cards");
    let temp = "";

    //  loop profile into temp container
    presidents.forEach((president) => {
        //
        const {
            name,
            no,
            imgsrc,
            from,
            to,
            reason,
            causeofdeath,
            born,
            party,
        } = president;

        const isReasionAvailable = reason ? `(${reason})` : "";
        const isDeceased = causeofdeath ? `(${causeofdeath})` : "";
        //
        temp += `
    <div class="card" onclick="viewMore('${no}')">
        <div class="card-image">
            <img
                load="lazy"
                src="./assets/portraits/${imgsrc}"
                alt="${name}"
                width="100%"
                height="100%"
            />
        </div>
        <div class="read-more"><h3>read more</h3></div>
        <div class="card-info">
            <h3 class="name">President ${name}</h3>
            <h3 class="tenure">From ${from} to ${to} ${isReasionAvailable}</h3>
            <h3 class="born">Born: ${born} ${isDeceased}</h3>
            <h3 class="party">Party: ${party}</h3>
        </div>
    </div>
  `;
    });

    // append temp to the profile card in the ui
    profileCard.innerHTML = temp;
};

// SECTION TO SORT PRESIDENT BY RANK

// render the president profile to the ui
const renderPresidentRank = async (presidents) => {
    // profile card parent div
    const profileCard = document.querySelector(".profile-cards");
    let details = "";
    //  loop profile into temp container
    presidents.forEach((president) => {
        //
        const { name, no, imgsrc, from, to, reason } = president;

        const isReasionAvailable = reason ? `(${reason})` : "";
        //
        details += `
    <div class="card" onclick="viewMore('${no}')">
        <div class="card-image">
            <img
                load="lazy"
                src="./assets/portraits/${imgsrc}"
                alt="${name}"
                width="100%"
                height="100%"
            />
        </div>
        <div class="read-more"><h3>read more</h3></div>
        <div class="card-info">
            <h3 class="name">President ${name}</h3><br>
            <h3 class="tenure">From ${from} to ${to} ${isReasionAvailable}</h3>
            <h3 class="party">Rank: ${no}</h3>
        </div>
    </div>
  `;
    });

    profileCard.innerHTML = details;
};
// END OF SECTION TO SORT PRESIDENTS RANK

const handleButtonColor = () => {
    const buttons = document.querySelectorAll(".sorting-btn button");
    for (let index = 0; index < buttons.length; index += 1) {
        const defColor = "rgba(39, 63, 39, 0.7)";

        buttons[index].addEventListener("click", () => {
            buttons[index].style.backgroundColor = "green";
        });

        //
        buttons[index].addEventListener("focusout", () => {
            buttons[index].style.backgroundColor = defColor;
        });
    }
};

/* SORTING AREA */
const sortByLatest = async () => {
    // Get the president from the fetch function
    const { presidents } = await fetchPresidentData();
    // Sort the president list from new to old
    // eslint-disable-next-line no-shadow
    const sortByLatest = presidents.sort((a, b) => b.from - a.from);
    renderPresidentProfile(sortByLatest);

    handleButtonColor();
};

/* SORTING AREA */
// eslint-disable-next-line no-unused-vars
async function sortByOld() {
    // Get the president from the fetch function
    const { presidents } = await fetchPresidentData();
    // Sort the president list from old to new
    const sortByOldest = presidents.sort((a, b) => a.from - b.from);
    // Render the president profile to the ui
    renderPresidentProfile(sortByOldest);

    handleButtonColor();
}

/* SORTING AREA */
// eslint-disable-next-line no-unused-vars
const sortByRank = async () => {
    // Get the president from the fetch function
    const { presidents } = await fetchPresidentData();
    // Sort the president list from new to and get the rank
    // eslint-disable-next-line no-shadow
    const sortByRank = presidents.sort((a, b) => b.no - a.no);
    renderPresidentRank(sortByRank);

    handleButtonColor();
};

// view more function
// eslint-disable-next-line no-unused-vars
const viewMore = (presidentNumber) => {
    // store the selected president number in LS
    localStorage.setItem("viewing_president", JSON.stringify(presidentNumber));
    // redirect user to the view-more page
    window.open("./../public/view-more.html", "_self");
};

// Entry Level
sortByLatest();
