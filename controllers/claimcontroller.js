const claim = require("../models/manageclaims");
const found = require("../models/managefound");
const mongoose = require("mongoose");

exports.claimdetails = (req, res, next) => {
  claim
    .find()
    .sort({ _id: -1 })
    .then((founddata) => {
      const claimids = founddata.map((ids) => ids.refid.toString());

      found.find().then((datas) => {
        let fdata = [];
        for (let i = 0; i < claimids.length; i++) {
          const matchdata =  datas.find((dataid) => {
            return dataid._id.toString() == claimids[i];
          });

          if (matchdata) {
            fdata.push(matchdata);
          }
        }

        const ids = datas.map((data) => data._id.toString());
        const delid = founddata.filter((id) => {
          return !ids.includes(id.refid.toString());
        });

        delid.forEach((id) => {
          const del = id._id.toString();
          console.log(del);
          claim
            .findByIdAndDelete(del)
            .then(() => console.log("Delete is success!"));
        });

        res.render("claimrequest", {
          founddata: fdata,
          pagetitle: "Claim Requests",
          isloggedin: req.session.isloggedin,
        });
      });
    });
};

exports.addtoclaimitems = (req, res, next) => {
  const refid = req.params.claimid;

  // Guard: reject non-ObjectId values before hitting the DB
  if (!mongoose.Types.ObjectId.isValid(refid)) {
    console.warn(`[addtoclaimitems] Invalid claimid param: "${refid}" — redirecting.`);
    return res.redirect('/found_items');
  }

  found.findById(refid).then((foundItem) => {
    if (!foundItem) return res.redirect('/found_items');

    // Block: the person who reported the item cannot claim it themselves
    if (foundItem.useremail && foundItem.useremail === req.session.useremail) {
      console.warn(`[addtoclaimitems] Self-claim blocked for ${req.session.useremail}`);
      return res.redirect(`/found_items/${refid}?selfclaim=true`);
    }

    claim.find().then((data) => {
      const existing = data.find((ids) => {
        return ids.refid.toString() == refid;
      });

      if (!existing) {
        const useremail = req.session.useremail;
        const claimitem = new claim({ refid, useremail });
        claimitem
          .save()
          .then(() => {
            console.log("Claim added successfully!");
            res.redirect("/claimrequests");
          })
          .catch((err) => console.log(err));
      } else {
        res.redirect(`/found_items/${refid}?claim=true&claimed=true`);
      }
    });
  }).catch(next);
};
