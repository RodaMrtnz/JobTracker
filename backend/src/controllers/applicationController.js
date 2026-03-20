class ApplicationController {
  constructor(applicationService) {
    this.applicationService = applicationService;
  }

  async create(req, res) {
    try {
      const userId = req.user.id;
      const { companyId, position, technology, description, jobLink, statusName } = req.body;

      if (!companyId || !position || !technology || !description || !jobLink || !statusName) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const result = await this.applicationService.create({
        companyId,
        position,
        technology,
        description,
        jobLink,
        statusName,
        userId,
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const applications = await this.applicationService.getAll(userId);
      return res.status(200).json(applications);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Application ID is required" });
      }

      const application = await this.applicationService.getById(id, userId);
      return res.status(200).json(application);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async updateById(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({ error: "Application ID is required" });
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Provide at least one field to update" });
      }

      const result = await this.applicationService.updateById(id, userId, updateData);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default ApplicationController;