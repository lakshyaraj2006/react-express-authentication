const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database.config');
const port = 3500 || process.env.PORT;

require('dotenv').config();

connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());

app.use('/api/auth', require('./routes/auth.route'));

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
})