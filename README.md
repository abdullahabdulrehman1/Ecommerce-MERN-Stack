steps: FRONTEND
cd frontend
update the stripe public key               ==> frontend/src/utils/stripekey.jsx 
update the url for all API's               ==>frontend/src/utils/exporturl.jsx
 npm i
 npm run dev

steps: BACKEND
rename this file to .env                   ==>backend/envtemplate
and also update all the fields             ==>backend/envtemplate
update the frontend url in this file       ==>backend/helpers/url.js
npm i 
npm run server 
