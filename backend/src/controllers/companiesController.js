class CompaniesController {
  constructor(companiesService) {
    this.companiesService = companiesService;
  }

  async create(req, res) {
    try {
      const { name, industry } = req.body;

      if (!name || !industry) {
        return res.status(400).json({ error: "Name and industry are required" });
      }

      const result = await this.companiesService.create({
        name,
        industry,
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const companies = await this.companiesService.getAll();
      return res.status(200).json(companies);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Company ID is required" });
      }

      const company = await this.companiesService.getById(id);
      return res.status(200).json(company);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async updateById(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({ error: "Company ID is required" });
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Provide at least one field to update" });
      }

      const result = await this.companiesService.updateById(id, updateData);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default CompaniesController;
