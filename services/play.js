const Play = require('../models/Play');

async function getAllPlays() {
    return Play.find({}).lean();
}

async function getPublicPlays() {
    return Play.find({ public: true }).sort({ createdAt: -1 }).lean();
}

async function getPlayById(id) {
    const play = await Play.findById(id).populate('usersLiked').lean();

    return play;
}

async function createPlay(playData) {
    const pattern = new RegExp(`^${playData.title}$`, 'i');
    const existing = await Play.findOne({ title: { $regex: pattern } });

    if (existing) {
        throw new Error('A Play with this name already exists');
    }

    const play = new Play(playData);
    await play.save();

    return play;
}

async function updatePlay(id, playData) {
    const play = await Play.findById(id);

    play.title = playData.title;
    play.description = playData.description;
    play.imageUrl = playData.imageUrl;
    play.public = Boolean(playData.public);

    await play.save(id);
}

async function deletePlay(id) {
    return Play.findByIdAndDelete(id);
}

module.exports = {
    getAllPlays,
    getPublicPlays,
    getPlayById,
    createPlay,
    updatePlay,
    deletePlay
};