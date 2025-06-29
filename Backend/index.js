require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./lib/connectDB');
const cors = require('cors');

const app = express();

app.use(
	cors({
	  origin: [process.env.FRONTEND_URL],
	  credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server is running on Port " + PORT);
	connectDB();
});

app.get('/', (req, res) => {
    res.send('this is root');
});

// auth routes
app.use("/auth", require('./routes/auth'));

// job routes
app.use("/job", require('./routes/job'));

// interview routes
app.use("/feedback", require('./routes/feedback'));