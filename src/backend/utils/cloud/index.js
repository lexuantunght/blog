const cloudinary = require('cloudinary');
const path = require('path');

cloudinary.v2.config({
    cloud_name: 'dwb0yer6d',
    api_key: '277341352213514',
    api_secret: 'b9GOgQrgU15KZSUJ2m0vV6gIHV8',
    secure: true,
});

const uploads = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file.filepath,
            {
                resource_type: 'auto',
                folder: 'Blog' + folder,
                public_id: path.parse(file.filepath).name,
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                    reject({ errorCode: 400, message: err });
                }
                resolve(result.secure_url);
            }
        );
    });
};

const removeById = (public_id) => {
    cloudinary.v2.uploader.destroy(public_id);
};

const removeByUrl = (fileUrl, folder) => {
    if (!fileUrl) return;
    const image = fileUrl.substring(fileUrl.lastIndexOf('/'), fileUrl.lastIndexOf('.'));
    cloudinary.v2.uploader.destroy('Blog' + folder + image);
};

const cloud = { uploads, removeById, removeByUrl };
module.exports = cloud;
