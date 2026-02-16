class CompaniesService {
  constructor(models) {
    this.Company = models.Company;
  }

  async create(companyData) {
    try {
      const { name, industry, website } = companyData;

      // Verificar que no exista una empresa con el mismo nombre
      const existingCompany = await this.Company.findOne({ where: { name } });
      if (existingCompany) {
        throw new Error("Una empresa con este nombre ya existe");
      }

      const newCompany = await this.Company.create({
        name,
        industry,
        website,
      });

      return {
        id: newCompany.id,
        name: newCompany.name,
        industry: newCompany.industry,
        website: newCompany.website,
        message: "Empresa creada exitosamente",
      };
    } catch (error) {
      throw new Error(`Error al crear empresa: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const companies = await this.Company.findAll();

      if (companies.length === 0) {
        return { message: "No hay empresas registradas", companies: [] };
      }

      return companies;
    } catch (error) {
      throw new Error(`Error al obtener empresas: ${error.message}`);
    }
  }

  async getById(companyId) {
    try {
      const company = await this.Company.findByPk(companyId);

      if (!company) {
        throw new Error("Empresa no encontrada");
      }

      return company;
    } catch (error) {
      throw new Error(`Error al obtener empresa: ${error.message}`);
    }
  }

  async updateById(companyId, updateData) {
    try {
      const company = await this.Company.findByPk(companyId);

      if (!company) {
        throw new Error("Empresa no encontrada");
      }

      // No permitir cambiar id
      delete updateData.id;

      // Si se actualiza el nombre, verificar que no exista otro con ese nombre
      if (updateData.name && updateData.name !== company.name) {
        const existingCompany = await this.Company.findOne({ where: { name: updateData.name } });
        if (existingCompany) {
          throw new Error("Una empresa con este nombre ya existe");
        }
      }

      await company.update(updateData);

      return {
        id: company.id,
        name: company.name,
        industry: company.industry,
        website: company.website,
        message: "Empresa actualizada exitosamente",
      };
    } catch (error) {
      throw new Error(`Error al actualizar empresa: ${error.message}`);
    }
  }
}

export default CompaniesService;
