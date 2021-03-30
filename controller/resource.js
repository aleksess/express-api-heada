const ResourceFactory = require('../model/resource');


module.exports.getResources = async (req, res) => {
    const Resource = await ResourceFactory()
    const resources = await Resource.find({}).exec()
    res.send(resources)
}

module.exports.addResource = async (req, res) => {
    const Resource = await ResourceFactory()
    const payload = req.body;
    const resource = await new Resource(payload).save();
    res.send(resource)
}