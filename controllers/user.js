const express = require("express");
const sql = require("mssql");
const dbconfig = require("../dbconfig");

sql.connect(dbconfig, (err) => {
  if (err) {
    throw err;
  }
});

exports.signup = async (req, res, next) => {
  const mail = req.body.mail;
  const mob = req.body.mob;
  const fname = req.body.fname;
  const spn = req.body.spn;
  const pass = req.body.pass;
  const phrases = req.body.phrases;
  const priKey = req.body.private;
  const PubKey = req.body.public;
  try {
    const result = await new sql.Request()
      .input("intro_id", spn)
      .input("app_name", fname)
      .input("Email", mail)
      .input("mob", mob)
      .input("pass", pass)
      .input("phrases", phrases)
      .input("privateKey", priKey)
      .input("publicKey", PubKey)
      .execute("registration");
    if (result.recordset[0].uid === "MAIL") {
      res.status(404).json({ data: result.recordset[0].uid });
    } else if (result.recordset[0].uid === "INTRO") {
      res.status(404).json({ data: "Sponsor Not Exists" });
    } else {
      res.status(200).json({ data: result.recordset });
    }
  } catch (err) {
    throw err;
  }
};

exports.booking = async (req, res, next) => {
  const publicKey = req.body.publicKey;
  const amt = req.body.amt;
  const txn = req.body.txn;
  const mode = req.body.mode;
  try {
    const result = await new sql.Request()
      .input("publicKey", publicKey)
      .input("amt", amt)
      .input("txn", txn)
      .input("mode", mode)
      .execute("SP_Activation");
    res.status(200).json({ data: "Success" });
  } catch (err) {
    throw err;
  }
};
exports.booking_wallet = async (req, res, next) => {
  const publicKey = req.body.publicKey;
  const amt = req.body.amt;
  try {
    const result = await new sql.Request()
      .input("publicKey", publicKey)
      .input("amt", amt)
      .execute("SP_Activation_wallet");
    res.status(200).json({ data: "Success" });
  } catch (err) {
    throw err;
  }
};
exports.insertTransaction = async (req, res, next) => {
  const publicKey = req.body.publicKey;
  const amt = req.body.amt;
  const txn = req.body.txn;
  const details = req.body.details;
  const symbol = req.body.symbol;
  const status = req.body.status;
  try {
    const result = await new sql.Request()
      .input("publicKey", publicKey)
      .input("txn", txn)
      .input("details", details)
      .input("amount", amt)
      .input("symbol", symbol)
      .input("status", status)
      .execute("insert_transaction");
    res.status(200).json({ data: "Success" });
  } catch (err) {
    throw err;
  }
};
exports.editTransaction = async (req, res, next) => {
  const txn = req.body.txn;
  try {
    const result = await new sql.Request()
      .input("txn", txn)
      .execute("updateTranstions");
    res.status(200).json({ data: "Success" });
  } catch (err) {
    throw err;
  }
};
exports.withdrawal = async (req, res, next) => {
  const user = req.body.publicKey;
  const amt = req.body.amount;
  try {
    const result = await new sql.Request()
      .input("publicKey", user)
      .input("amount", amt)
      .execute("sp_withdrawal");
    res.status(200).json({ data: "Success" });
  } catch (err) {
    throw err;
  }
};
exports.payWithdrawal = async (req, res, next) => {
  const withSL = req.body.sl;
  const txn = req.body.txn;
  try {
    const result = await new sql.Request()
      .input("withdra_sl", withSL)
      .input("txn", txn)
      .execute("sp_pay_withdrawal");
    res.status(200).json({ data: "Success" });
  } catch (err) {
    throw err;
  }
};
exports.getUser = (req, res, next) => {
  const uid = req.params.id;
  console.log(uid);
  new sql.Request()
    .input("id", uid)
    .execute("getUserProfile")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getPendingActivation = (req, res, next) => {
  const publicKey = req.params.publicKey;
  new sql.Request()
    .input("publicKey", publicKey)
    .execute("getPending_activation")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getMail = (req, res, next) => {
  const uid = req.params.mail;
  console.log(uid);
  new sql.Request()
    .input("mail", uid)
    .execute("getMail")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data Found" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getPhrases = (req, res, next) => {
  const uid = req.params.phrases;
  console.log(uid);
  new sql.Request()
    .input("phrases", uid)
    .execute("getPhrases")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "No Data Found" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
exports.getall = (req, res, next) => {
  new sql.Request()
    .execute("getAll")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getDirect = (req, res, next) => {
  const uid = req.params.uid;
  console.log(uid);
  new sql.Request()
    .input("uid", uid)
    .execute("getDirect")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getDirectSummery = (req, res, next) => {
  const uid = req.params.uid;
  new sql.Request()
    .input("uid", uid)
    .execute("getDirectSummery")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getAccountSummery = (req, res, next) => {
  const uid = req.params.phrases;
  new sql.Request()
    .input("uid", uid)
    .execute("getAccountSummery")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getMyPackages = (req, res, next) => {
  const uid = req.params.phrases;
  new sql.Request()
    .input("uid", uid)
    .execute("getMyPackage")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getMyTransactions = (req, res, next) => {
  const uid = req.params.phrases;
  new sql.Request()
    .input("uid", uid)
    .execute("getMyTranstions")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getWithdrawCheck = (req, res, next) => {
  const uid = req.params.phrases;
  new sql.Request()
    .input("publicKey", uid)
    .execute("withdrawal_check")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getWithdraw = (req, res, next) => {
  const uid = req.params.phrases;
  new sql.Request()
    .input("publicKey", uid)
    .execute("my_withdrawal")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getPendingWithdraw = (req, res, next) => {
  new sql.Request()
    .execute("getPendingWithdrawal")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.updateUser = (req, res, next) => {
  const uid = req.body.PubKey;
  const type = req.body.type;
  const vals = req.body.vals;
  new sql.Request()
    .input("uid", uid)
    .input("type", type)
    .input("value", vals)
    .execute("updateUserBy_type")
    .then((result) => {
      res.status(200).json({ data: "Success" });
    })
    .catch((err) => {
      throw err;
    });
};

exports.getLogin = (req, res, next) => {
  const uid = req.params.mail;
  const pass = req.params.pass;
  new sql.Request()
    .input("mail", uid)
    .input("pass", pass)
    .execute("getLogin")
    .then((result) => {
      if (result.recordset[0]) {
        res.status(200).json({ data: result.recordset });
      } else {
        res.status(404).json({ data: "NO" });
      }
    })
    .catch((err) => {
      throw err;
    });
};
