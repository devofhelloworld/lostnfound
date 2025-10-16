const claim = require("../models/manageclaims");
const found = require("../models/managefound");

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
  found.findById(refid).then((datas) => {
    claim.find().then((data) => {
      const datas = data.find((ids) => {
        return ids.refid.toString() == refid;
      });

      if (!datas) {
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
  });
};
