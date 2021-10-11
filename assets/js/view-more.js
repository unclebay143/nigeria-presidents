// fetch the json from file/endpoint
const fetchPresidentData = async () => {
  const response = await fetch("./../assets/js/data.json");
  const data = await response.json();
  //
  return data;
};

const findSelectedPresident = async () => {
  // grab clicked no
  const presidentToView = JSON.parse(localStorage.getItem("viewing_president"));

  // grab president from json
  const { presidents } = await fetchPresidentData();

  // find clicked no from json
  const selectedPresident = presidents.filter(
    (president) => president.no === presidentToView
  );

  console.log(selectedPresident[0]);

  //display to ui
  renderPresidentInformation(selectedPresident[0]);
};
findSelectedPresident();
// // localStorage.removeItem('name');
// // localStorage.removeItem('imgsrc');
// // localStorage.removeItem('info');

const renderPresidentInformation = ({
  name,
  no,
  born,
  diedInOffice,
  party,
  extra_information,
  contributors,
  imgsrc,
  tribe,
  from,
  to,
  moreinfo,
}) => {
  var presidentNameContainer = document.getElementById("js-president-name");
  var presidentImageHolder = document.getElementById("js-president-img");
  var moreInfoContainer = document.getElementById("js-president-moreinfo");

  presidentNameContainer.innerHTML = name;
  moreInfoContainer.innerHTML = moreinfo || extra_information[0].bio;
  presidentImageHolder.setAttribute("src", `./../assets/portraits/${imgsrc}`);
};
