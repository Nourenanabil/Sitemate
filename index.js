const express = require("express");
const app = express();
const port = 3000;
const Novel = require("./controller/novel.js");

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(express.json());
app.use(express.urlencoded());

app.get("/novels", (req, res) => {
  try {
    const novels = Novel.all();
    res.json(novels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/novels", (req, res) => {
  try {
    console.log(req.body);
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      const novel = new Novel(0, title, description);
      novel.save();
      res.status(201).json(novel);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

app.patch("/novel/:id", (req, res) => {
  try {
    const { title, description } = req.body;
    const novel = Novel.find(req.params.id);
    if (!novel) {
      res.status(404).json({ error: "Novel not found" });
    } else if (!title || !description) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      novel.id = req.params.id;
      novel.title = title;
      novel.description = description;

      novel.save();
      res.json(novel);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

app.delete("/novel/:id", (req, res) => {
  const novel = Novel.find(req.params.id);
  if (!novel) {
    res.status(404).json({ error: "Novel not found" });
  } else {
    novel.delete();
    res.json({ message: "Novel deleted successfully" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
