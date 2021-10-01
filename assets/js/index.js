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
    const { name, imgsrc, from, to, reason, causeofdeath, born, party, moreinfo } =
      president;

    const isReasionAvailable = reason ? `(${reason})` : "";
    const isDeceased = causeofdeath ? `(${causeofdeath})` : "";
    //
    temp += `
    <div class="card" onclick="viewMore(this)">
        <div class="card-image">
            <img
                load="lazy"
                src="./assets/portraits/${imgsrc}"
                alt="${name}"
                width="100%"
                height="100%"
            />
        </div>
        <div class="read-more"><a href="${moreinfo}"><h3>read more</h3></a></div>
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
};

/* SORTING AREA*/
const sortByOld = async () => {
  // Get the president from the fetch function
  const { presidents } = await fetchPresidentData();
  // Sort the president list from old to new
  const sortByOldest = presidents.sort((a, b) => a.from - b.from);
  // Render the president profile to the ui
  renderPresidentProfile(sortByOldest);
};

const viewMore = (e) => {
  // TODO: users should be able to view more information about the president
  // document.querySelector(".message").innerText =
  //   "Yes! you should be able to view more, you can fix this";
  // var href = e.childNodes[3].innerHTML;
  var href = e.children[1].children[0].getAttribute("href");

  window.open(href, "_blank");
};

// Entry Level
sortByLatest();
