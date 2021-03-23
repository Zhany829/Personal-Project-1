const Ground = require('../models/ground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const ground = await Ground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    ground.reviews.push(review);
    await review.save();
    await ground.save();
    req.flash('success', 'Created new comment!');
    res.redirect(`/grounds/${ground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Ground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted comment')
    res.redirect(`/grounds/${id}`);
}
