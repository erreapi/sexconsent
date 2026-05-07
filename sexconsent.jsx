import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper Passion Meter component with animation and SVG
function AnimatedPassionMeter({ passion, setPassion }) {
  const flames = Array.from({ length: passion }, (_, i) => (
    <motion.svg
      key={i}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      animate={{
        y: [-4, 0, -4],
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.8],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1 + i * 0.12,
        delay: i * 0.1,
        ease: "backInOut",
      }}
      style={{ display: "inline-block", marginRight: 2 }}
    >
      <defs>
        <radialGradient id={`flameGrad${i}`} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#fff4b7" />
          <stop offset="80%" stopColor="#ff595a" />
          <stop offset="100%" stopColor="#fb197c" />
        </radialGradient>
      </defs>
      <path
        d="M16 30c8-5 6-14 0-24-6 10-8 19 0 24z"
        fill={`url(#flameGrad${i})`}
      />
      <ellipse
        cx="16"
        cy={18 + (i % 2 ? 2 : 0)}
        rx={4}
        ry={5}
        fill="#fff9"
        opacity="0.5"
      />
    </motion.svg>
  ));
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 160 }}
        className="mt-3 mb-4"
      >
        {flames}
      </motion.div>
      <motion.input
        className="w-full"
        style={{
          accentColor: "#ff5177",
          filter: "drop-shadow(0 2px 8px #ff8caf66)",
          marginTop: 16,
        }}
        type="range"
        value={passion}
        min="1"
        max="10"
        onChange={(e) => setPassion(Number(e.target.value))}
        whileHover={{ scale: 1.04, boxShadow: "0 0 12px #ff79ac" }}
      />
      <div className="flex justify-between w-full mt-3 text-rose-400 text-xs">
        <span>🥰 Sweet & Cozy</span>
        <span>🔥 Movie Scene Energy</span>
      </div>
    </div>
  );
}

export default function SexConsent() {
  const translations = {
    en: {
      title: "SexConsent 💘",
      subtitle:
        "A playful, flirty, and respectful way for couples to talk about what they want, what they don’t want, and what sounds exciting tonight.",
      yes: "Yes",
      maybe: "Maybe",
      no: "No",
      passion: "Passion Level",
      randomizer: "Random Flirt",
      footer: "Consent Is Sexy",
      footerText:
        "Communication, respect, laughter, and comfort make intimacy better.",
      save: "Save Tonight’s Vibes ✨",
    },
    it: {
      title: "Scintilla del Consenso 💘",
      subtitle:
        "Un modo giocoso e rispettoso per parlare di desideri e limiti.",
      yes: "Sì",
      maybe: "Forse",
      no: "No",
      passion: "🌶️ Livello di Passione",
      randomizer: "😂 Random Flirt",
      footer: "❤️ Il Consenso è Sexy",
      footerText:
        "Comunicazione e rispetto rendono tutto migliore.",
      save: "Salva l’atmosfera ✨",
    },
    es: {
      title: "Chispa del Consentimiento 💘",
      subtitle:
        "Una forma divertida y respetuosa de hablar sobre deseos y límites.",
      yes: "Sí",
      maybe: "Tal vez",
      no: "No",
      passion: "🌶️ Nivel de Pasión",
      randomizer: "😂 Coqueteo Aleatorio",
      footer: "❤️ El Consentimiento es Sexy",
      footerText:
        "La comunicación y el respeto mejoran la intimidad.",
      save: "Guardar vibra ✨",
    },
    fr: {
      title: "Étincelle du Consentement 💘",
      subtitle:
        "Une façon amusante et respectueuse de parler de ses envies.",
      yes: "Oui",
      maybe: "Peut-être",
      no: "Non",
      passion: "🌶️ Niveau de Passion",
      randomizer: "😂 Flirt Aléatoire",
      footer: "❤️ Le Consentement est Sexy",
      footerText:
        "Communication et respect rendent l’intimité meilleure.",
      save: "Sauvegarder l’ambiance ✨",
    },
  };

  const [language, setLanguage] = React.useState("en");
  const t = translations[language] || translations.en;
  const [passion, setPassion] = React.useState(5);

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

  // Background SVG flourishes
  function BackgroundSVG() {
    return (
      <svg
        className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
        viewBox="0 0 1920 1080"
        style={{ opacity: 0.13 }}
      >
        <defs>
          <radialGradient id="rad1" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#ffeffe" />
            <stop offset="80%" stopColor="#fa90b9" />
            <stop offset="100%" stopColor="#fff0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="350"
          cy="200"
          rx="480"
          ry="380"
          fill="url(#rad1)"
        />
        <ellipse
          cx="1800"
          cy="1060"
          rx="470"
          ry="330"
          fill="url(#rad1)"
        />
        <ellipse
          cx="950"
          cy="900"
          rx="700"
          ry="350"
          fill="url(#rad1)"
        />
      </svg>
    );
  }

  // Animation for entry
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.1, type: "spring", damping: 22 },
    }),
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 flex items-center justify-center">
      <BackgroundSVG />
      <motion.div
        className="relative z-10 max-w-5xl w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-rose-200 mt-10"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <div className="flex justify-end mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border border-rose-200 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-rose-400"
          >
            <option value="en">🇺🇸 English</option>
            <option value="it">🇮🇹 Italiano</option>
            <option value="es">🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
        </div>

        <div className="text-center mb-10">
          <motion.h1
            className="text-5xl font-black text-rose-600 mb-3 tracking-tight"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 18, delay: 0.1 }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto"
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              custom={idx}
              key={category.title}
              className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-6 shadow-md border border-rose-100 hover:scale-[1.02] transition-transform"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.emoji}</span>
                <h2 className="text-2xl font-bold text-rose-700">
                  {category.title}
                </h2>
              </div>
              <div className="space-y-3">
                {category.options.map((option, j) => (
                  <motion.label
                    key={option}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 10px #fcb4dc54",
                    }}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-rose-100 hover:border-rose-300 transition cursor-pointer"
                  >
                    <span className="font-medium text-gray-700">{option}</span>
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.93 }}
                        whileHover={{
                          backgroundColor: "#6ee7b7",
                          color: "#14532d",
                        }}
                        className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold shadow"
                      >
                        {t.yes}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.93 }}
                        whileHover={{
                          backgroundColor: "#fde047",
                          color: "#713f12",
                        }}
                        className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold shadow"
                      >
                        {t.maybe}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.93 }}
                        whileHover={{
                          backgroundColor: "#fda4af",
                          color: "#7f1d1d",
                        }}
                        className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold shadow"
                      >
                        {t.no}
                      </motion.button>
                    </div>
                  </motion.label>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <motion.div
            className="bg-rose-50 rounded-2xl p-6 border border-rose-100 shadow-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", damping: 18 }}
          >
            <h3 className="text-2xl font-bold text-rose-700 mb-2 flex items-center gap-1">
              <span role="img" aria-label="Passion">
                🌶️
              </span>{" "}
              {t.passion}
            </h3>
            <AnimatedPassionMeter passion={passion} setPassion={setPassion} />
          </motion.div>

          <motion.div
            className="bg-pink-50 rounded-2xl p-6 border border-pink-100 shadow-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.23, type: "spring", damping: 15 }}
          >
            <h3 className="text-2xl font-bold text-pink-700 mb-3">
              😂 {t.randomizer}
            </h3>
            <motion.div
              className="bg-white rounded-xl p-4 text-gray-700 italic shadow-inner border border-pink-100"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.65 }}
            >
              “Tonight’s safe word is... <b>Parmesan</b>.”
            </motion.div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{
                scale: 1.04,
                background: "linear-gradient(to right,#e11d48,#ec4899,#fbbf24)",
                color: "#fff",
              }}
              className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition shadow"
            >
              Generate Another Mood
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", damping: 19 }}
        >
          <h2 className="text-3xl font-black mb-2">
            ❤️ {t.footer}
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-6 text-rose-50">
            {t.footerText}
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 24px #fff9",
              background: "linear-gradient(90deg,#fff 40%,#ffe4e6 100%)",
              color: "#be123c",
            }}
            className="bg-white text-rose-600 font-black px-8 py-4 rounded-2xl text-lg shadow-lg hover:scale-105 transition"
          >
            {t.save}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
