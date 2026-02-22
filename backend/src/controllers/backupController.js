class BackupController {
	constructor(backupService) {
		this.backupService = backupService;
	}

	async download(req, res, next) {
		try {
			const dbPath = this.backupService.getDbFilePath();
			const filename = `jobtracker-backup-${new Date().toISOString().slice(0, 10)}.db`;

			return res.download(dbPath, filename);
		} catch (err) {
			next(err);
		}
	}
}

export default BackupController;
