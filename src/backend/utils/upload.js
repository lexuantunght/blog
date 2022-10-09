const formidable = require('formidable');
const fs = require('fs');

const uploadDir = './public/uploads';

const upload = (req, options = { multiples: false }) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        const form = formidable({
            uploadDir,
            multiples: options.multiples,
            keepExtensions: true,
        });
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject({ errorCode: 400, message: err });
            }
            req.files = files;
            req.body = fields;
            resolve(files);
        });
    });
};

module.exports = upload;
