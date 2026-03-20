// src/services/BackupService.js
import fs from "fs";
import path from "path";

class BackupService {
  static getDbFilePath() {
    // Adjust the path if your db is elsewhere
    const dbPath = path.resolve("src", "data", "jobtracker.db");

    if (!fs.existsSync(dbPath)) {
      const err = new Error("Database file not found");
      err.status = 404;
      throw err;
    }

    return dbPath;
  }
}

export default BackupService;
