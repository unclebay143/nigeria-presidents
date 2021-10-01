// fetch the json from file/endpoint
const fetchPresidentData = async () => {
  const response = await fetch("./assets/js/data.json");
  const data = await response.json();
  //
  return data;
};

// render the president profile to the ui
const renderPresidentProfile = async (presidents) => {
  // profile card parent div
  const profileCard = document.querySelector(".profile-cards");
  let temp = "";
  //  loop profile into temp container
  presidents.forEach((president) => {
    //
    const { name, imgsrc, from, to, reason, causeofdeath, born, party } =
      president;

    const isReasionAvailable = reason ? `(${reason})` : "";
    const isDeceased = causeofdeath ? `(${causeofdeath})` : "";
    //
    temp += `
    <div class="card" onclick="viewMore()">
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

/* SORTING AREA*/
const sortByLatest = async () => {
  // Get the president from the fetch function
  const { presidents } = await fetchPresidentData();
  // Sort the president list from new to old
  const sortByLatest = presidents.sort((a, b) => b.from - a.from);
  renderPresidentProfile(sortByLatest);
  // change button color
  setButtonStyle();
};

/* SORTING AREA*/
const sortByOld = async () => {
  // Get the president from the fetch function
  const { presidents } = await fetchPresidentData();
  // Sort the president list from old to new
  const sortByOldest = presidents.sort((a, b) => a.from - b.from);
  // Render the president profile to the ui
  renderPresidentProfile(sortByOldest);
  // change button color
  setButtonStyle();
};

// scalable
const setButtonStyle = () => {
  const buttons = document.querySelectorAll(".sorting-btn button");
  for (let index = 0; index < buttons.length; index++) {
    buttons[index].addEventListener("click", () => {
      buttons[index].style.backgroundColor = "green";
    });
    buttons[index].addEventListener("focusout", () => {
      buttons[index].style.backgroundColor = "rgba(39, 63, 39, 0.7)";
    });
  }
};

//
const viewMore = () => {
  // TODO: users should be able to view more information about the president
  document.querySelector(".message").innerText =
    "Yes! you should be able to view more, you can fix this";
};

// Entry Level
sortByLatest();
