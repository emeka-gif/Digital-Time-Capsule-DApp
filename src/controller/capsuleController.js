const CapsuleStorage = require('../databse_helper/capsuleStorage');
const crypto = require('crypto');

class CapsuleController {
    async createCapsule(data) {
        if (!data.lockDate || !data.message) {
            return {
                error: 'Lock date and message must be provided.',
            };
        }

        const newCapsule = {
            id: crypto.randomUUID(),
            lockDate: new Date(data.lockDate).toISOString(),
            message: data.message,
        };

        CapsuleStorage.addCapsule(newCapsule);

        return {
            ok: true,
            message: 'Capsule created successfully!',
            data: newCapsule,
        };
    }

    async getCapsule(id) {
        const capsule = CapsuleStorage.getCapsuleById(id);
        if (!capsule) {
            return {
                error: `Capsule not found for id '${id}'`,
            };
        }

        const currentDate = new Date().toISOString();
        if (new Date(capsule.lockDate) > new Date(currentDate)) {
            return {
                error: 'Capsule is still locked.',
            };
        }

        return {
            data: capsule,
        };
    }

    async getAllCapsules() {
        return {
            data: CapsuleStorage.getAllCapsules(),
        };
    }
}

module.exports = new CapsuleController();
