const fs = require("fs");
const path = require("path");

class Novel {
  constructor(id, title, description) {
    if (id) {
      this.id = id;
    } else {
      const novels = Novel.all();
      const sortedNovels = novels.sort((a, b) => {
        a.id - b.id;
      });
      this.id = sortedNovels[sortedNovels.length - 1].id + 1;
    }

    this.title = title;
    this.description = description;
  }

  static all() {
    const novelsPath = path.join(__dirname, "../data/novels.json");
    const novels = fs.readFileSync(novelsPath);
    return JSON.parse(novels);
  }

  static find(id) {
    const novels = this.all();
    const novel = novels.find((n) => n.id == id);
    return new Novel(novel.id, novel.title, novel.description);
  }

  save() {
    var novels = Novel.all();
    if (this.id) {
      novels = novels.map((novel) => {
        if (novel.id == this.id) {
          return {
            id: this.id,
            title: this.title,
            description: this.description,
          };
        }

        return novel;
      });
    } else {
      novels = [
        ...novels,
        {
          id: this.id,
          title: this.title,
          description: this.description,
        },
      ];
    }

    const novelsPath = path.join(__dirname, "../data/novels.json");

    fs.writeFileSync(novelsPath, JSON.stringify(novels));
  }

  delete() {
    const novels = Novel.all().filter((n) => n.id != this.id);
    const novelsPath = path.join(__dirname, "../data/novels.json");

    fs.writeFileSync(novelsPath, JSON.stringify(novels));
  }
}
module.exports = Novel;
