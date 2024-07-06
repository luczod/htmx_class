import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/load-content", (_, res) => {
  res.send("<p>This is the content loaded via hx-get</p>");
});

app.post("/submit-form", (req, res) => {
  const { username } = req.body;
  res.send(`<p>Form sent. Name: ${username}</p>`);
});

app.get("/swap-content", (_, res) => {
  res.send(`<div class="alert alert-success" role="alert">
              A simple success alert—check it out!
            </div>`);
});

app.post("/additional-values", (req, res) => {
  const { keyExtra, username } = req.body;
  // console.log(req.body);

  res.send(
    `<p>Form sent. Name: ${username} | Extra value added: ${keyExtra}</p>`
  );
});

app.get("/time-server", (_, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.send(`<p>Current server time: ${currentTime}</p>`);
});

app.post("/submit-form-validation", (req, res) => {
  const { username } = req.body;
  if (!username || username.length < 6) {
    res.send(
      `<p style="color: red;">Error: Username must be at least 6 characters long.</p>`
    );
  } else {
    res.send(`<p>Form sent successfully. User name: ${username}</p>`);
  }
});

app.get("/other", (_, res) => {
  res.sendFile("other.html", { root: __dirname + "/public" });
});

app.get("/spinner.svg", (_, res) => {
  res.sendFile("./spinner.svg", { root: __dirname + "/public" });
});

app.get("/search", (req, res) => {
  const q = req.query.q;

  if (!!Number(q)) {
    res.send(`<img
            src="https://picsum.photos/id/${q}/400/600"
            alt="random image"
            uk-cover
            />`);
  } else {
    res.send(`<img
            src="https://picsum.photos/id/70/400/600"
            alt="random image"
            uk-cover
            />`);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
