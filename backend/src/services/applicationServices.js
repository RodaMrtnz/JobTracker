class ApplicationService {
  constructor(models) {
    this.Application = models.Application;
    this.Company = models.Company;
    this.Status = models.Status;
  }

  async create(applicationData) {
    try {
      const { companyId, position, technology, description, jobLink, statusName, userId } = applicationData;

      // Verify that the company exists
      const company = await this.Company.findByPk(companyId);
      if (!company) {
        throw new Error("Company not found");
      }

      // Verify that the status exists
      const status = await this.Status.findOne({ where: { name: statusName } });
      if (!status) {
        throw new Error("Invalid status");
      }

      const newApplication = await this.Application.create({
        companyId,
        position,
        technology,
        description,
        jobLink,
        statusName,
        userId,
      });

      return {
        id: newApplication.id,
        companyId: newApplication.companyId,
        position: newApplication.position,
        technology: newApplication.technology,
        description: newApplication.description,
        jobLink: newApplication.jobLink,
        statusName: newApplication.statusName,
        userId: newApplication.userId,
        message: "Application created successfully",
      };
    } catch (error) {
      throw new Error(`Error creating application: ${error.message}`);
    }
  }

  async getAll(userId) {
    try {
      const applications = await this.Application.findAll({
        where: { userId },
        include: [
          { model: this.Company, attributes: ["id", "name"] },
          { model: this.Status, attributes: ["name", "color"] },
        ],
      });

      if (applications.length === 0) {
        return { message: "No applications registered", applications: [] };
      }

      return applications;
    } catch (error) {
      throw new Error(`Error fetching applications: ${error.message}`);
    }
  }

  async getById(applicationId, userId) {
    try {
      const application = await this.Application.findOne({
        where: { id: applicationId, userId },
        include: [
          { model: this.Company, attributes: ["id", "name"] },
          { model: this.Status, attributes: ["name", "color"] },
        ],
      });

      if (!application) {
        throw new Error("Application not found");
      }

      return application;
    } catch (error) {
      throw new Error(`Error fetching application: ${error.message}`);
    }
  }

  async updateById(applicationId, userId, updateData) {
    try {
      const application = await this.Application.findOne({
        where: { id: applicationId, userId },
      });

      if (!application) {
        throw new Error("Application not found");
      }

      // Do not allow changing id or userId
      delete updateData.id;
      delete updateData.userId;

      // If status is updated, verify it is valid
      if (updateData.statusName) {
        const status = await this.Status.findOne({ where: { name: updateData.statusName } });
        if (!status) {
          throw new Error("Invalid status");
        }
      }

      // If company is updated, verify it exists
      if (updateData.companyId) {
        const company = await this.Company.findByPk(updateData.companyId);
        if (!company) {
          throw new Error("Company not found");
        }
      }

      await application.update(updateData);

      return {
        id: application.id,
        companyId: application.companyId,
        position: application.position,
        technology: application.technology,
        description: application.description,
        jobLink: application.jobLink,
        statusName: application.statusName,
        userId: application.userId,
        message: "Application updated successfully",
      };
    } catch (error) {
      throw new Error(`Error updating application: ${error.message}`);
    }
  }
}

export default ApplicationService;
