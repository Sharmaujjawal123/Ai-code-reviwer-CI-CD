require('dotenv').config()
const app = require('./src/app')

// console.log("🔐 Gemini Key in container:", process.env.GOOGLE_GEMINI_KEY);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})