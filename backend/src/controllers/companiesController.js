class CompaniesController {
  constructor(companiesService) {
    this.companiesService = companiesService;
  }

  async create(req, res) {
    try {
      const { name, industry } = req.body;

      if (!name || !industry) {
        return res.status(400).json({ error: "Nombre e industria son requeridos" });
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
        return res.status(400).json({ error: "ID de empresa requerido" });
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
        return res.status(400).json({ error: "ID de empresa requerido" });
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Proporciona al menos un campo para actualizar" });
      }

      const result = await this.companiesService.updateById(id, updateData);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default CompaniesController;
