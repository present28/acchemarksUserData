require('dotenv').config();
const express = require('express');
const mcqRoutes = require('./routes/mcqRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/mcq', mcqRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
