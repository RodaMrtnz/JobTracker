import Status from "../models/Status.js";

class ApplicationService {
  constructor(models) {
    this.Application = models.Application;
    this.Status = models.Status || Status;
  }

  async initializeStatus() {
    try {
      const statuses = [
        { name: "Applied", color: "blue" },
        { name: "Interviewing", color: "yellow" },
        { name: "Offer", color: "white" },
        { name: "Declined", color: "red" },
        { name: "Accepted", color: "green" },
      ];

      for (const status of statuses) {
        await this.Status.findOrCreate({
          where: { name: status.name },
          defaults: status,
        });
      }

      console.log("Status initialized successfully");
    } catch (error) {
      console.error("Error initializing status:", error.message);
    }
  }

  // Aquí irían otros métodos de Application...
}

export default ApplicationService;