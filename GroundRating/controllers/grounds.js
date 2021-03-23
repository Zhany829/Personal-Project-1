const Ground = require('../models/ground');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const grounds = await Ground.find({}).populate('popupText');
    res.render('grounds/index', { grounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('grounds/new');
}

module.exports.createGround = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.ground.location,
        limit: 1
    }).send()
    const ground = new Ground(req.body.ground);
    ground.geometry = geoData.body.features[0].geometry;
    ground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    ground.author = req.user._id;
    await ground.save();
    console.log(ground);
    req.flash('success', 'Successfully made a new ground!');
    res.redirect(`/grounds/${ground._id}`)
}

module.exports.showGround = async (req, res,) => {
    const ground = await Ground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!ground) {
        req.flash('error', 'Cannot find that ground!');
        return res.redirect('/grounds');
    }
    res.render('grounds/show', { ground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const ground = await Ground.findById(id)
    if (!ground) {
        req.flash('error', 'Cannot find that ground!');
        return res.redirect('/grounds');
    }
    res.render('grounds/edit', { ground });
}

module.exports.updateGround = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const ground = await Ground.findByIdAndUpdate(id, { ...req.body.ground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    ground.images.push(...imgs);
    await ground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await ground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated ground!');
    res.redirect(`/grounds/${ground._id}`)
}

module.exports.deleteGround = async (req, res) => {
    const { id } = req.params;
    await Ground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted ground')
    res.redirect('/grounds');
}