// fetch the json from file/endpoint
const fetchPresidentData = async () => {
  const response = await fetch("./assets/js/data.json");
  const data = await response.json();
  //
  return data;
};

// render the president profile to the ui
const renderPresidentProfile = async () => {
  // profile card parent div
  const profileCard = document.querySelector(".profile-cards");
  // get the president from the fetch function
  const { presidents } = await fetchPresidentData();
  //
  let temp = "";
  //  loop profile into temp container
  presidents.forEach((president) => {
    //
    const { name, imgsrc, from, to, reason, causeofdeath, born, party } =
      president;

    const isReasionAvailable = reason ? `(${reason})` : "";
    //
    temp += `
    <div class="card">
        <div class="card-image">
            <img
                src="./assets/portraits/${imgsrc}"
                alt="${name}"
            />
        </div>
        <div class="card-info">
            <h3 class="name">President ${name}</h3>
            <h3 class="tenure">From ${from} to ${to} ${isReasionAvailable}</h3>
            <h3 class="born">Born: ${born}</h3>
            <h3 class="party">Party: ${party}</h3>
        </div>
    </div>
  `;
  });

  // append temp to the profile card in the ui
  profileCard.innerHTML = temp;
};

// entry function
renderPresidentProfile();
