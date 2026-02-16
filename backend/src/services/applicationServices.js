class ApplicationService {
  constructor(models) {
    this.Application = models.Application;
    this.Company = models.Company;
    this.Status = models.Status;
  }

  async create(applicationData) {
    try {
      const { companyId, position, technology, description, jobLink, statusName, userId } = applicationData;

      // Verificar que la empresa existe
      const company = await this.Company.findByPk(companyId);
      if (!company) {
        throw new Error("Empresa no encontrada");
      }

      // Verificar que el estado existe
      const status = await this.Status.findOne({ where: { name: statusName } });
      if (!status) {
        throw new Error("Estado no válido");
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
        message: "Aplicación creada exitosamente",
      };
    } catch (error) {
      throw new Error(`Error al crear aplicación: ${error.message}`);
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
        return { message: "No hay aplicaciones registradas", applications: [] };
      }

      return applications;
    } catch (error) {
      throw new Error(`Error al obtener aplicaciones: ${error.message}`);
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
        throw new Error("Aplicación no encontrada");
      }

      return application;
    } catch (error) {
      throw new Error(`Error al obtener aplicación: ${error.message}`);
    }
  }

  async updateById(applicationId, userId, updateData) {
    try {
      const application = await this.Application.findOne({
        where: { id: applicationId, userId },
      });

      if (!application) {
        throw new Error("Aplicación no encontrada");
      }

      // No permitir cambiar id ni userId
      delete updateData.id;
      delete updateData.userId;

      // Si se actualiza el estado, verificar que sea válido
      if (updateData.statusName) {
        const status = await this.Status.findOne({ where: { name: updateData.statusName } });
        if (!status) {
          throw new Error("Estado no válido");
        }
      }

      // Si se actualiza la compañía, verificar que exista
      if (updateData.companyId) {
        const company = await this.Company.findByPk(updateData.companyId);
        if (!company) {
          throw new Error("Empresa no encontrada");
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
        message: "Aplicación actualizada exitosamente",
      };
    } catch (error) {
      throw new Error(`Error al actualizar aplicación: ${error.message}`);
    }
  }
}

export default ApplicationService;
