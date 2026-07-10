const found = require("../models/managefound");
const claim = require("../models/manageclaims");
const mongoose = require("mongoose");

// Build the Set of claimed found-item IDs
async function getClaimedIds() {
  const claims = await claim.find({}, 'refid');
  return new Set(
    claims
      .filter(c => mongoose.Types.ObjectId.isValid(c.refid.toString()))
      .map(c => c.refid.toString())
  );
}

exports.searchdata = async (req, res, next) => {
  try {
    const { keyword, category } = req.body;
    const claimedIds = await getClaimedIds();

    const query = category === 'all' ? {} : { category };
    const alldata = await found.find(query);

    const results = alldata.filter(item => {
      // Exclude claimed items
      if (claimedIds.has(item._id.toString())) return false;
      // Keyword match on item name
      return item.itemname.toLowerCase().includes(keyword.toLowerCase());
    });

    res.render('searchresults', {
      founddata: results,
      pagetitle: 'Search Results',
      show: results.length === 0 ? '' : 'hidden',
      isloggedin: req.session.isloggedin
    });
  } catch (err) {
    next(err);
  }
};
