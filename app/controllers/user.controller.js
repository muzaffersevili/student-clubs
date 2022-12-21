exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.studentBoard = (req, res) => {
    res.status(200).send("Student Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.chairPersonBoard = (req, res) => {
    res.status(200).send("Chairperson Content.");
};

exports.counselorBoard = (req, res) => {
    res.status(200).send("Counselor Content.");
};