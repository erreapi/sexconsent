import React, { useState, useRef } from "react";
// For export as PNG, install: npm install html2canvas
// import html2canvas from "html2canvas";

const categories = [
  {
    title: "The Basics",
    emoji: "💋",
    options: [
      "Kissing",
      "Cuddling",
      "Massage",
      "Dirty talk",
      "Shower together",
    ],
  },
  {
    title: "Bedroom Adventures",
    emoji: "🔥",
    options: [
      "Oral sex",
      "Roleplay",
      "Light bondage",
      "Using toys",
      "Trying a new position",
    ],
  },
  {
    title: "Safety & Comfort",
    emoji: "🛡️",
    options: [
      "Condoms required",
      "No condoms",
      "Safe word agreed",
      "Lights on",
      "Music playlist approved",
    ],
  },
  {
    title: "Mood Settings",
    emoji: "🌹",
    options: [
      "Slow & romantic",
      "Funny & playful",
      "Passionate & intense",
      "Aftercare cuddles",
      "Snacks afterward",
    ],
  },
];

const PRACTICE_KEYS = categories.flatMap(cat => 
  cat.options.map(opt => `${cat.title}|${opt}`)
);

function newBlankAnswers() {
  // Build an object: { [practiceKey]: null }
  const obj = {};
  PRACTICE_KEYS.forEach(k => (obj[k] = null));
  return obj;
}

export default function SexConsentMultiLover() {
  const [stage, setStage] = useState("start"); // start, answer, handoff, reviewing
  const [numLovers, setNumLovers] = useState(2);
  const [loverIndex, setLoverIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]); // Array of answer-objects
  const [currentAnswers, setCurrentAnswers] = useState(newBlankAnswers());
  const [agreementLogic, setAgreementLogic] = useState("inclusive"); // inclusive: show not-‘no’ by all, strict: all ‘yes’
  const [result, setResult] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const resultRef = useRef();

  function startSession() {
    setStage("answer");
    setLoverIndex(0);
    setAllAnswers([]);
    setCurrentAnswers(newBlankAnswers());
    setResult(null);
  }

  function handleOptionSelect(practiceKey, value) {
    setCurrentAnswers(a => ({
      ...a,
      [practiceKey]: value,
    }));
  }

  function completeLover() {
    const nextAnswers = [...allAnswers, currentAnswers];
    if (loverIndex + 1 < numLovers) {
      setAllAnswers(nextAnswers);
      setCurrentAnswers(newBlankAnswers());
      setLoverIndex(loverIndex + 1);
      setStage("handoff");
      setTimeout(() => setStage("answer"), 1200); // auto-move on after 1.2s
    } else {
      // All have answered
      setStage("reviewing");
      setResult(calculateAgreedPractices([...nextAnswers]));
    }
  }

  function calculateAgreedPractices(answerArr) {
    // For each practice, check all answers
    // INCLUSIVE: not a single 'no'
    // STRICT: all must be 'yes'
    const agreed = [];
    PRACTICE_KEYS.forEach(practiceKey => {
      const responses = answerArr.map(a => a[practiceKey]);
      if (
        agreementLogic === "inclusive"
          ? responses.every(v => v !== "no")
          : responses.every(v => v === "yes")
      ) {
        const [catTitle, optText] = practiceKey.split("|");
        agreed.push({ catTitle, optText });
      }
    });
    return agreed;
  }

  function handleSelfieUpload(e) {
    if (e.target.files && e.target.files[0]) {
      setSelfie(URL.createObjectURL(e.target.files[0]));
    }
  }

  // function saveAgreementAsImage() {
  //   html2canvas(resultRef.current).then(canvas => {
  //     const link = document.createElement("a");
  //     link.download = "SexConsent_Agreement.png";
  //     link.href = canvas.toDataURL();
  //     link.click();
  //   });
  // }

  function resetAll() {
    setStage("start");
    setAllAnswers([]);
    setResult(null);
    setSelfie(null);
    setCurrentAnswers(newBlankAnswers());
    setLoverIndex(0);
  }

  // RENDER
  if (stage === "start") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50">
        <h1 className="text-4xl font-bold text-rose-600 mb-6">
          SexConsent Group Agreement
        </h1>
        <label className="mb-4 text-lg">Number of Lovers Involved:</label>
        <input
          type="number"
          value={numLovers}
          min={2}
          max={8}
          className="border p-2 w-20 rounded mb-8 text-center"
          onChange={e => setNumLovers(Number(e.target.value))}
        />
        <button
          className="bg-rose-500 text-white px-6 py-2 rounded-lg shadow hover:bg-rose-600"
          onClick={startSession}
        >
          Start Private Session
        </button>
      </div>
    );
  }

  if (stage === "handoff") {
    // Secure pass-the-device handover, keep brief for demo
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rose-100">
        <span className="mb-4 text-xl font-bold text-rose-600">
          Pass the device to Lover #{loverIndex + 1}!
        </span>
        <span className="text-sm text-gray-700">Privacy is respected. Don’t peek.</span>
      </div>
    );
  }

  if (stage === "answer") {
    return (
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8 mt-8 mb-8">
        <h2 className="text-2xl font-bold text-rose-600 mb-2">
          Lover #{loverIndex + 1}
        </h2>
        <p className="mb-4 text-gray-600 text-sm">
          Mark what you'd like to do <b>tonight</b>. Your response is private!
        </p>

        {categories.map(cat => (
          <section key={cat.title} className="mb-5">
            <div className="flex items-center font-semibold mb-2 text-lg">
              <span className="mr-2">{cat.emoji}</span>
              {cat.title}
            </div>
            {cat.options.map(opt => {
              const k = `${cat.title}|${opt}`;
              return (
                <div key={k} className="flex items-center gap-2 mb-2">
                  <span className="flex-1">{opt}</span>
                  {["yes", "maybe", "no"].map(v => (
                    <button
                      key={v}
                      className={`px-3 py-1 rounded-full border ${
                        currentAnswers[k] === v
                          ? v === "yes"
                            ? "bg-green-200 border-green-400"
                            : v === "maybe"
                            ? "bg-yellow-100 border-yellow-400"
                            : "bg-rose-100 border-rose-400"
                          : "bg-gray-50"
                      }`}
                      onClick={() => handleOptionSelect(k, v)}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              );
            })}
          </section>
        ))}
        <button
          onClick={completeLover}
          className="w-full bg-rose-500 text-white font-bold py-2 rounded-xl mt-3 hover:bg-rose-600"
        >
          Done! {loverIndex + 1 === numLovers ? "See Results" : "Next Lover"}
        </button>
      </div>
    );
  }

  // REVIEWING/RESULTS PAGE
  if (stage === "reviewing") {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 pt-8 pb-12">
        <div className="max-w-lg w-full bg-white/90 border shadow-lg rounded-3xl p-8" ref={resultRef}>
          <h2 className="text-3xl font-black text-rose-600 mb-2 text-center">
            Common Yes & Maybe Practices
          </h2>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setAgreementLogic("inclusive")}
              className={`px-4 py-2 rounded-lg border ${
                agreementLogic === "inclusive"
                  ? "bg-rose-100 border-rose-400 font-bold"
                  : "bg-gray-50"
              }`}
            >
              Show All Not-“No”
            </button>
            <button
              onClick={() => setAgreementLogic("strict")}
              className={`px-4 py-2 rounded-lg border ${
                agreementLogic === "strict"
                  ? "bg-green-100 border-green-400 font-bold"
                  : "bg-gray-50"
              }`}
            >
              Everyone “Yes” Only
            </button>
          </div>
          <ul>
            {calculateAgreedPractices(allAnswers).length === 0 ? (
              <li className="text-center text-rose-500 my-8">
                No practices in common agreement. Try again!
              </li>
            ) : (
              calculateAgreedPractices(allAnswers).map((a, idx) => (
                <li
                  key={idx}
                  className="mb-3 px-3 py-2 text-lg bg-gradient-to-r from-pink-50 via-rose-100 to-pink-50 rounded shadow-sm flex items-center"
                >
                  <span className="mr-2 text-xl">
                    {
                      categories.find(c => c.title === a.catTitle)?.emoji
                    }
                  </span>
                  <span>{a.optText}</span>
                </li>
              ))
            )}
          </ul>
          <div className="my-6">
            <label className="block mb-2 text-center font-semibold">Group Selfie (optional):</label>
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleSelfieUpload}
              className="w-full mb-2"
            />
            {selfie && (
              <div className="flex justify-center mb-2">
                <img src={selfie} alt="selfie" className="rounded-full w-32 border-4 border-pink-200" />
              </div>
            )}
            {/* <button onClick={saveAgreementAsImage} className="w-full bg-pink-400 mt-4 text-white font-bold py-2 rounded-xl hover:bg-pink-600">
              Save This Agreement as PNG
            </button> */}
          </div>
          <button
            onClick={resetAll}
            className="w-full mt-4 bg-gray-200 text-gray-700 rounded-xl py-2 hover:bg-gray-300"
          >
            New Session / Clear All
          </button>
          <div className="mt-4 text-center text-xs text-gray-400">
            All answers are private and stored only in this device/session. Reloading this page erases all data.
          </div>
        </div>
      </div>
    );
  }

  return null;
}
