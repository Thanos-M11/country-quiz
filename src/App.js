import { useState } from "react";

// const CountryQuiz = function (country, cities) {
//   this.country = country;
//   this.cities = cities;
// };

// CountryQuiz.prototype._capitalId = function () {
//   return this.cities.findIndex((city) => city.includes("⭐️"));
// };

// Object.defineProperty(CountryQuiz.prototype, "question", {
//   get: function () {
//     return `What is the capital of ${this.country} ?`;
//   },
// });

// Object.defineProperty(CountryQuiz.prototype, "capital", {
//   get: function () {
//     return this.cities.at(this._capitalId());
//   },
// });

// Object.defineProperty(CountryQuiz.prototype, "choices", {
//   get: function () {
//     return this.cities.map((city) => city.replace("⭐️", ""));
//   },
// });

class CountryQuiz {
  constructor(country, cities) {
    this.country = country;
    this.cities = cities;
  }

  get question() {
    return `What is the capital of ${this.country} ?`;
  }

  _capitalId() {
    return this.cities.findIndex((city) => city.includes("⭐️"));
  }

  get capital() {
    // the capital is the city with a star ⭐️ in front
    return this.cities.at(this._capitalId());
  }

  get choices() {
    return this.cities.map((city) => city.replace("⭐️", ""));
  }
}

const benin = new CountryQuiz("Benin", [
  "Parakou",
  "Cotonou",
  "⭐️PortoNovo",
  "Abomey",
]);

const burkinaFaso = new CountryQuiz("Burkina Faso", [
  "Koudougou",
  "Ouahigouya",
  "⭐️Ouagadougou",
  "Banfora",
]);
const capeVerde = new CountryQuiz("Cape Verde", [
  "Mindelo",
  "⭐️Praia",
  "Assomada",
  "Tarrafal",
]);
const gambia = new CountryQuiz("Gambia", [
  "⭐️Banjul",
  "Serekunda",
  "Brikama",
  "Farafenni",
]);
const ghana = new CountryQuiz("Ghana", [
  "Kumasi",
  "Tamale",
  "⭐️Accra",
  "Tema",
]);
const guinea = new CountryQuiz("Guinea", [
  "Kankan",
  "⭐️Conakry",
  "Kindia",
  "Labé",
]);
const guineaBissau = new CountryQuiz("Guinea-Bissau", [
  "Bafatá",
  "⭐️Bissau",
  "Gabú",
  "Mansôa",
]);
const ivoryCoast = new CountryQuiz("Ivory Coast", [
  "Abidjan",
  "Daloa",
  "San Pedro",
  "⭐️Yamoussoukro",
]);
const liberia = new CountryQuiz("Liberia", [
  "Gbarnga",
  "⭐️Monrovia",
  "Kakata",
  "Harper",
]);
const mali = new CountryQuiz("Mali", [
  "⭐️Bamako",
  "Sikasso",
  "Mopti",
  "Ségou",
]);
const mauritania = new CountryQuiz("Mauritania", [
  "Nouadhibou",
  "Kiffa",
  "⭐️Nouakchott",
  "Rosso",
]);
const niger = new CountryQuiz("Niger", [
  "Maradi",
  "Agadez",
  "⭐️Niamey",
  "Tahoua",
]);
const nigeria = new CountryQuiz("Nigeria", [
  "Lagos",
  "⭐️Abuja",
  "Ibadan",
  "Port Harcourt",
]);
const senegal = new CountryQuiz("Senegal", [
  "Touba",
  "⭐️Dakar",
  "Thies",
  "Kaolack",
]);
const sierraLeone = new CountryQuiz("Sierra Leone", [
  "Bo",
  "Kenema",
  "⭐️Freetown",
  "Makeni",
]);
const togo = new CountryQuiz("Togo", ["Sokodé", "Kara", "⭐️Lomé", "Bassar"]);

const quiz = [
  benin,
  burkinaFaso,
  capeVerde,
  gambia,
  ghana,
  guinea,
  // guineaBissau,
  // ivoryCoast,
  // liberia,
  // mali,
  // mauritania,
  // niger,
  // nigeria,
  // senegal,
  // sierraLeone,
  // togo,
];

let progressBoard = quiz.map((country) => {
  return {
    country: country.country,
    capital: country.capital,
    submission: null,
    result: function () {
      return country.cities.at(this.submission) === this.capital;
    },
  };
});

export default function App() {
  const [currentOpen, setCurrentOpen] = useState(null);
  const [progress, setProgress] = useState(progressBoard);

  function handleProgress(countryId, submissionId) {
    const newProgressBoard = progressBoard.map((entry, i) => {
      if (i === countryId) {
        return {
          ...entry,
          country: quiz.at(i).country,
          submission: submissionId,
        };
      }
      return entry;
    });
    setProgress(newProgressBoard);
  }

  function handleCurrentOpen(isOpen, id) {
    setCurrentOpen(isOpen ? null : id);
  }

  return (
    <>
      <p className="title">Country Quiz</p>
      <div className="container">
        <Progress
          quiz={quiz}
          currentOpen={currentOpen}
          onCurrentOpen={handleCurrentOpen}
        >
          <Score progress={progress} />
        </Progress>
        <Accordion
          quiz={quiz}
          currentOpen={currentOpen}
          onCurrentOpen={handleCurrentOpen}
          onSetProgress={handleProgress}
          progress={progress}
        />
      </div>
    </>
  );
}

function Accordion({
  children,
  quiz,
  currentOpen,
  onCurrentOpen,
  progress,
  onSetProgress,
}) {
  return (
    <div className="box">
      <p className="heading">Questions</p>
      <ul className="accordion-list">
        {quiz.map((country, index) => (
          <AccordionItem
            country={country.country}
            key={index}
            index={index}
            currentOpen={currentOpen}
            onCurrentOpen={onCurrentOpen}
          >
            <AccordionContent
              currentOpen={currentOpen}
              onCurrentOpen={onCurrentOpen}
              index={index}
              choices={country.choices}
              progress={progress}
              onSetProgress={onSetProgress}
            />
          </AccordionItem>
        ))}
      </ul>
    </div>
  );
}

function AccordionItem({
  children,
  index,
  country,
  currentOpen,
  onCurrentOpen,
}) {
  const isOpen = currentOpen === index;

  return (
    <li
      className="accordion-list-item"
      onClick={() => onCurrentOpen(isOpen, index)}
    >
      <section className={`accordion-item-heading ${isOpen && "active"}`}>
        <span className="index">{String(index).padStart(2, "0")}</span>
        <p className="question">
          What is the capital of <span className="country">{country}</span>
        </p>
        <span>{isOpen ? "➖" : "➕"}</span>
      </section>

      {isOpen && children}
    </li>
  );
}

function AccordionContent({
  currentOpen,
  onCurrentOpen,
  index,
  choices,
  progress,
  onSetProgress,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  function handleSelectedOption(e) {
    // console.log(index, e.target.value);
    setSelectedOption((cur) => (cur = Number(e.target.value)));
    onCurrentOpen(false, index);
    onSetProgress(index, Number(e.target.value));
  }

  return (
    <ul className="accordion-content">
      {choices.map((city, i) => (
        <li className="choice" key={i}>
          <label>
            <input
              type="radio"
              name="choice"
              value={i}
              checked={selectedOption === i}
              onChange={(e) => handleSelectedOption(e)}
            />
            {city}
          </label>
        </li>
      ))}
    </ul>
  );
}

function Progress({ children, quiz, currentOpen, onCurrentOpen }) {
  return (
    <div className="box">
      <p className="heading">Question Progress</p>
      <ul className="progress-list">
        {quiz.map((country, index) => (
          <li
            className={`progress-list-item ${
              currentOpen === index && "active"
            }`}
            key={index}
            onClick={() => onCurrentOpen(currentOpen === index, index)}
          >
            {String(index).padStart(2, "0")}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

function Score({ progress }) {
  progress.forEach((entry) => {
    console.log(entry.country, entry.submission, entry.capital, entry.result());
  });

  const [scoreClicked, setScoreClicked] = useState(false);

  function handleScoreToggle() {
    setScoreClicked((cur) => !cur);
  }

  const correctAnswers = progress.filter(
    (country) => country.result() === true
  );
  const score = !correctAnswers.length
    ? 0
    : (correctAnswers.length / progress.length) * 100;

  return (
    <section className="score-box">
      <p className="heading score-btn" onClick={handleScoreToggle}>
        Score
      </p>
      {scoreClicked && (
        <>
          <p className="score">
            <span className="correct">
              {!correctAnswers.length ? 0 : correctAnswers.length}
            </span>
            <span className="divider">/</span>
            <span className="total">{progress.length}</span>
          </p>
          <p className="heading score-percentage">{score.toFixed(2)}%</p>
        </>
      )}
    </section>
  );
}
