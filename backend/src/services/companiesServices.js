class CompaniesService {
  constructor(models) {
    this.Company = models.Company;
  }

  async create(companyData) {
    try {
      const { name, industry } = companyData;

      // Verify no company exists with the same name
      const existingCompany = await this.Company.findOne({ where: { name } });
      if (existingCompany) {
        throw new Error("A company with this name already exists");
      }

      const newCompany = await this.Company.create({
        name,
        industry,
      });

      return {
        id: newCompany.id,
        name: newCompany.name,
        industry: newCompany.industry,
        message: "Company created successfully",
      };
    } catch (error) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const companies = await this.Company.findAll();

      if (companies.length === 0) {
        return { message: "No companies registered", companies: [] };
      }

      return companies;
    } catch (error) {
      throw new Error(`Error fetching companies: ${error.message}`);
    }
  }

  async getById(companyId) {
    try {
      const company = await this.Company.findByPk(companyId);

      if (!company) {
        throw new Error("Company not found");
      }

      return company;
    } catch (error) {
      throw new Error(`Error fetching company: ${error.message}`);
    }
  }

  async updateById(companyId, updateData) {
    try {
      const company = await this.Company.findByPk(companyId);

      if (!company) {
        throw new Error("Company not found");
      }

      // Do not allow changing id
      delete updateData.id;

      // If name is updated, verify no other company has that name
      if (updateData.name && updateData.name !== company.name) {
        const existingCompany = await this.Company.findOne({ where: { name: updateData.name } });
        if (existingCompany) {
          throw new Error("A company with this name already exists");
        }
      }

      await company.update(updateData);

      return {
        id: company.id,
        name: company.name,
        industry: company.industry,
        message: "Company updated successfully",
      };
    } catch (error) {
      throw new Error(`Error updating company: ${error.message}`);
    }
  }
}

export default CompaniesService;
