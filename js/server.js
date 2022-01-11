const PORT = 8000;
const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/solve',(req,res)=>{
    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY
        },
        data: {
            puzzle: req.body.numbers
        }
    };

    axios.request(options).then((response) => {
        res.json(response.data);
    }).catch((error) => {
        res.json(error);
    });
    
});

app.listen(PORT,()=>console.log(`Server rodando na porta ${PORT}`));
