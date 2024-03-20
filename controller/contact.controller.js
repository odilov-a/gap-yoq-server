const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const jsonFilePath = "json/contact.json";

const readContactFile = () => {
  try {
    const filePath = path.join(__dirname, "..", jsonFilePath);
    const fileData = readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileData);
    if (!jsonData || !jsonData.data) {
      throw new Error("Invalid data structure in the JSON file");
    }
    return jsonData.data;
  } catch (error) {
    throw new Error("Error reading contact data file");
  }
};

const writeContactFile = (data) => {
  try {
    const filePath = path.join(__dirname, "..", jsonFilePath);
    const jsonData = { data };
    writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
  } catch (error) {
    throw new Error("Error writing to contact data file");
  }
};

exports.getAllContactInfo = (req, res) => {
  try {
    const contactData = readContactFile();
    return res.json({ data: contactData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateContactInfo = (req, res) => {
  try {
    const { phoneNumber, instagram, telegram } = req.body;
    const contactData = readContactFile();
    const updatedContact = {
      _id: "1",
      phoneNumber: phoneNumber || contactData.phoneNumber,
      instagram: instagram || contactData.instagram,
      telegram: telegram || contactData.telegram,
    };
    writeContactFile(updatedContact);
    return res.json({ data: updatedContact });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getContactInfoById = (req, res) => {
  try {
    const contactData = readContactFile();
    return res.json({ data: contactData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};