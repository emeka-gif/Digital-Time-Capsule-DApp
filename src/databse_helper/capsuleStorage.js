class CapsuleStorage {
    constructor() {
        this.capsules = new Map();
    }

    addCapsule(capsule) {
        this.capsules.set(capsule.id, capsule);
    }

    getCapsuleById(id) {
        return this.capsules.get(id);
    }

    getAllCapsules() {
        return Array.from(this.capsules.values());
    }
}

module.exports = new CapsuleStorage();
