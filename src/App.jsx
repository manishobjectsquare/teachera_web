// import { ToastContainer } from "react-toastify";
// import AppRoutes from "./AppRoutes";

// function App() {
//   return (
//     <>
//       <AppRoutes />
//     </>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import AppRoutes from "./AppRoutes";

// function App() {
//   const { i18n } = useTranslation();
//   const [langClass, setLangClass] = useState('font-ar');
//   useEffect(() => {
//     const applyArabicFontWeights = () => {
//       const arabicContainer = document.querySelector('.font-ar');
//       if (!arabicContainer) return;

//       const weightMap = {
//         '100': '250', '200': '250', '300': '250',
//         '400': '275', '500': '300', '600': '400',
//         '700': '500', '800': '600', '900': '700'
//       };

//       // Get all elements inside Arabic container
//       const allElements = arabicContainer.querySelectorAll('*');

//       [arabicContainer, ...allElements].forEach(element => {
//         const computedStyle = window.getComputedStyle(element);
//         const currentWeight = computedStyle.fontWeight;

//         if (weightMap[currentWeight]) {
//           element.style.fontWeight = weightMap[currentWeight];
//           element.style.fontFamily = 'MontserratArabic, sans-serif';
//         }

//         // Handle class-based weights
//         const classList = element.classList;
//         if (classList.contains('font-semibold')) {
//           element.style.fontWeight = '400';
//         } else if (classList.contains('font-medium')) {
//           element.style.fontWeight = '300';
//         } else if (classList.contains('font-bold')) {
//           element.style.fontWeight = '500';
//         }
//       });
//     };

//     // Apply on language change
//     if (langClass === 'font-ar') {
//       setTimeout(applyArabicFontWeights, 100);
//     }
//   }, [langClass]);
//   useEffect(() => {
//     const currentLang = i18n.language || 'ar';
//     if (currentLang === 'en') {
//       setLangClass('font-en');
//     } else {
//       setLangClass('font-ar');
//     }
//   }, []);

//   return (
//     <div className={langClass}>
//       <AppRoutes />
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppRoutes from "./AppRoutes";

function App() {
  const { i18n } = useTranslation();
  const [langClass, setLangClass] = useState("font-ar");

  useEffect(() => {
    const currentLang = i18n.language || "ar";
    if (currentLang === "en") {
      setLangClass("font-en");
    } else {
      setLangClass("font-ar");
    }
  }, [i18n.language]);

  return (
    <div className={langClass}>
      <AppRoutes />
    </div>
  );
}

export default App;

// let daa = {
//   Version: "2012-10-17",
//   Statement: [
//     {
//       Sid: "AllowPublicRead",
//       Effect: "Allow",
//       Principal: {
//         AWS: "*",
//       },
//       Action: "s3:GetObject",
//       Resource: ["arn:aws:s3:::<flikflowimg>/*", "arn:aws:s3:::<flikflowimg>"],
//     },
//   ],
// };

// {
//   "Version": "2012-10-17",
//   "Statement": [
//     {
//       "Sid": "AllowPublicRead",
//       "Effect": "Allow",
//       "Principal": "*",
//       "Action": "s3:GetObject",
//       "Resource": [
//         "arn:aws:s3:::flikflowimg/*"
//       ]
// //     }
//   ]
// }
