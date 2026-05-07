# SexConsent 💘

A beautiful, playful, and respectful React app for couples (or groups!) to communicate desires, boundaries, and discover new adventures together—featuring animated UI, language support, a passion meter, and now an anonymous multi-lover Group Agreement mode.

---

## ✨ Features
- Multi-language support (EN/IT/ES/FR)
- Gorgeous animated UI and backgrounds
- Fully animated Passion Meter (flames!)
- Random flirty prompt generator
- Responsive and mobile-friendly
- **Group Agreement mode:** Anonymous session for groups/lovers
- Final agreement page shows only common Yes/Maybe
- Take a group selfie and save for fun!
- All answers private, nothing stored or sent

---

## 🛠 Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/erreapi/sexconsent.git
   cd sexconsent
   ```
2. **Install required dependencies**
   ```bash
   npm install
   # or
yarn
   ```
   This installs:
   - React
   - Tailwind CSS
   - framer-motion (for beautiful animations)

3. **(Optional for Group Agreement save-as-PNG):**
   ```bash
   npm install html2canvas
   # or
yarn add html2canvas
   ```
4. **Tailwind setup:** [Official guide](https://tailwindcss.com/docs/guides/create-react-app) if not already in your stack.

---

## 🚀 Running the App
```bash
npm start
# or
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📄 Usage
- **Solo/Couple:** Use the original app as before.
- **Group Agreement:**
  1. Use the SexConsentMultiLover "Group Agreement" mode (see file `SexConsentMultiLover.jsx`).
  2. Select number of lovers, take turns answering anonymously, and review/snap/save agreed practices at the end.

## ⚙️ Customization
- Categories and options can be edited in `sexconsent.jsx` or `SexConsentMultiLover.jsx`.
- More languages, styling, or flows: extend as needed!

---

## ❓ Troubleshooting
- Ensure all dependencies are installed.
- If Tailwind styles are missing, check your setup.

---

## 🪄 Credits
Created with ❤️ for intimacy, safety, fun, and creativity.

---

## 📦 License
[MIT](LICENSE)
