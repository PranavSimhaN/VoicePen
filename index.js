import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about",(req,res)=>{
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/start",(req,res)=>{
  res.render("index1.ejs");
});

app.get("/go",(req,res)=>{
  res.render("index2.ejs");
});

app.post("/submit", (req, res) => {
  const numLetters = req.body["fName"];
  
  const openai = new OpenAI({
    apiKey:"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"
});
let data;

const audioFun=async()=>{
    const transcription = await openai.audio.transcriptions.create({
        file:fs.createReadStream(`${numLetters}`),
        model:"whisper-1"
    });
    console.log(transcription.text);
    data = transcription.text;
    res.render("index3.ejs",{ data1: data });
  }
  audioFun();
  
  });

app.post("submitt", (req, res) => {
    const data = req.body["name"];
    console.log(req.body["name"]);
    console.log(req.body["email"]);
    console.log(req.body["text"]);
    res.render("contact.ejs",{ data1: data });
  });
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// import OpenAI from "openai";
// import fs from "fs";

// const openai = new OpenAI({
//     apiKey:"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"
// });
// let data;

// const audioFun=async()=>{
//     const transcription = await openai.audio.transcriptions.create({
//         file:fs.createReadStream("aud.mp3"),
//         model:"whisper-1"
//     });
//     console.log(transcription.text);
//     data=transcription.text;
// }

// audioFun();
