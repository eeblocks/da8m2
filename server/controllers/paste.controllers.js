import { pool } from "../db.js";

function isIdValid(text) {
  return /^[a-zA-Z0-9]+$/.test(text);
}

function encryptRot13(text) {
  return text.replace(/[a-zA-Z]/g, (letter) => {
    const asciiCode = letter.charCodeAt(0);
    let newAsciiCode;

    if (asciiCode >= 65 && asciiCode <= 90) {
      // Capital letters
      newAsciiCode = ((asciiCode - 65 + 13) % 26) + 65;
    } else if (asciiCode >= 97 && asciiCode <= 122) {
      // Lowercase
      newAsciiCode = ((asciiCode - 97 + 13) % 26) + 97;
    } else {
      newAsciiCode = asciiCode;
    }

    return String.fromCharCode(newAsciiCode);
  });
}

// Function to generate a random alphanumeric string
function generateRandomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

export const getGlobalVisitors = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT count FROM visits");
    return res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPaste = async (req, res) => {
  try {
    if (isIdValid(req.params.id)) {
      const [result] = await pool.query("SELECT * FROM pastes WHERE id = ?", [
        req.params.id,
      ]);
      await pool.query("UPDATE visits SET count = count + 1");
      if (result.length === 0) {
        return res.status(404).json({ message: "Task not found" });
      } else {
        result[0].title = encryptRot13(result[0].title)
        result[0].content = encryptRot13(result[0].content)
        return res.json(result[0]);
      }
    } else {
      throw new Error("Invalid Paste Format.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRawPaste = async (req, res) => {
  try {
    if (isIdValid(req.params.id)) {
      const [result] = await pool.query("SELECT * FROM pastes WHERE id = ?", [
        req.params.id,
      ]);
      await pool.query("UPDATE visits SET count = count + 1");
      if (result.length === 0) {
        return res.status(404).json({ message: "Task not found" });
      } else {
        res.type("text/plain");
        result[0].content = encryptRot13(result[0].content);
        res.send(result[0].content);
      }
    } else {
      throw new Error("Invalid Paste Format.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPaste = async (req, res) => {
  try {
    const { title, content } = req.body;

    const encryptedTitle = encryptRot13(title);
    const encryptedContent = encryptRot13(content);

    const randomId = generateRandomId();
    const result = await pool.query(
      "INSERT INTO pastes(id, title, content) VALUES (?, ?, ?)",
      [randomId, encryptedTitle, encryptedContent]
    );

    res.json({
      id: randomId,
      encryptedTitle,
      encryptedContent,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
