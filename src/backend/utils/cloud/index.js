import cloudinary from 'cloudinary';
import path from 'path';

cloudinary.v2.config({
    cloud_name: 'dwb0yer6d',
    api_key: '277341352213514',
    api_secret: 'b9GOgQrgU15KZSUJ2m0vV6gIHV8',
    secure: true,
});

export const uploads = (file, folder) => {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
            file.path,
            {
                resource_type: 'auto',
                folder: 'Salley' + folder,
                public_id: path.parse(file.filename).name,
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                resolve(result.secure_url);
            }
        );
    });
};

export const removeById = (public_id) => {
    cloudinary.v2.uploader.destroy(public_id);
};

export const removeByUrl = (fileUrl, folder) => {
    if (!fileUrl) return;
    const image = fileUrl.substring(fileUrl.lastIndexOf('/'), fileUrl.lastIndexOf('.'));
    cloudinary.v2.uploader.destroy('Salley' + folder + image);
};

const cloud = { uploads, removeById, removeByUrl };
export default cloud;