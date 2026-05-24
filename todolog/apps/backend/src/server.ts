import prisma from "../lib/prisma";
import app from "./app";
const port = 8000;

// app root
app.get("/", (req, res) => {
  res.send({ message: "takenote app backend" });
});

// create a note
app.post("/notes", async (req, res) => {
  const { title, isCompleted } = req.body;

  const note = await prisma.note.create({
    data: {
      title,
      isCompleted,
    },
  });

  res.status(201).json({
    message: "Note Created",
    note,
  });
});

// get all notes
app.get("/notes", async (req, res) => {
  const notes = await prisma.note.findMany();

  res.status(201).json({
    message: "All notes",
    notes,
  });
});

// update status
app.patch("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const { isCompleted } = req.body;

  try {
    const note = await prisma.note.update({
      where: { id: noteId },
      data: { isCompleted },
    });

    res.json(note);
  } catch (error) {
    res.status(404).json({ error: "Note not found" });
  }
});

// delete a note
app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;

  const note = await prisma.note.delete({
    where: {
      id: noteId,
    },
  });

  res.status(201).json({
    message: "Notes Delted Successfully",
    note,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
