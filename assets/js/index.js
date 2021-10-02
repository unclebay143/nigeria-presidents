// fetch the json from file/endpoint
const fetchPresidentData = async () => {
	const response = await fetch('./assets/js/data.json');
	const data = await response.json();
	return data;
};

// render the president profile to the ui
const renderPresidentProfile = async presidents => {
	// profile card parent div
	const profileCard = document.querySelector('.profile-cards');
	let temp = '';
	//  loop profile into temp container
	presidents.forEach(president => {
		//
		const { name, imgsrc, from, to, reason, causeofdeath, born, party } = president;

		const isReasionAvailable = reason ? `(${reason})` : '';
		const isDeceased = causeofdeath ? `(${causeofdeath})` : '';
		const tillDate = () => {
			if (to == 2021) {
				return 'Till Date';
			} else {
				return to;
			}
		};
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
            <h3 class="tenure">From ${from} to ${tillDate()} ${isReasionAvailable}</h3>
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
	const sortByLatest = presidents.sort((a, b) => b.to - a.to);
	renderPresidentProfile(sortByLatest);
	//setting Styles
	setButtonStyle([true, false]);
};

/* SORTING AREA*/
const sortByOld = async () => {
	// Get the president from the fetch function
	const { presidents } = await fetchPresidentData();
	// Sort the president list from old to new
	const sortByOldest = presidents.sort((a, b) => a.to - b.to);
	// Render the president profile to the ui
	renderPresidentProfile(sortByOldest);
	//setting Styles
	setButtonStyle([false, true]);
};

const setButtonStyle = styles => {
	const buttons = document.querySelectorAll('.sorting-btn button');
	buttons.forEach((button, index) => {
		button.style.background = styles[index] ? 'green' : null;
	});
};

// view more function
const viewMore = (presidentNumber) => {
  // store the selected president number in LS
  localStorage.setItem("viewing_president", JSON.stringify(presidentNumber));
  // redirect user to the view-more page
  window.open("./../public/view-more.html", "_self");

};

// Entry Level
sortByLatest();
