import { ImageFile } from 'common/model';
import React from 'react';
import { GrClose } from 'react-icons/gr';
import { IoCloudUpload } from 'react-icons/io5';
import styles from './image-uploader.module.scss';

type ImageUploaderProps = {
    onChange?: (images: ImageFile[]) => void;
    value?: Array<ImageFile>;
    id?: string;
};

type ImagePreviewProps = {
    src?: string;
    onRemove?: () => void;
};

const ImagePreview = ({ src, onRemove }: ImagePreviewProps) => {
    return (
        <div className="flex relative h-fit">
            <img src={src} alt="preview" className={styles.preview} />
            <button type="button" className={styles.remove} onClick={onRemove}>
                <GrClose size={20} />
            </button>
        </div>
    );
};

const ImageUploader = ({ onChange, value = [], id }: ImageUploaderProps) => {
    const [images, setImages] = React.useState<Array<ImageFile>>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const promises: Promise<ImageFile>[] = [];
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];
                promises.push(
                    new Promise((resolve) => {
                        const fileReader = new FileReader();
                        fileReader.onload = () => {
                            if (fileReader.readyState === 2) {
                                resolve({
                                    file,
                                    url: fileReader.result,
                                    name: file.name,
                                });
                            }
                        };
                        fileReader.readAsDataURL(file);
                    })
                );
            }
            Promise.all(promises).then((imgs) => {
                setImages([...images, ...imgs]);
                onChange?.([...images, ...imgs]);
            });
        }
    };

    const onClickAttach = () => {
        if (inputRef) {
            inputRef.current?.click();
        }
    };

    const onRemoveImage = (img: ImageFile) => {
        const temp = images.filter((e) => e.url !== img.url);
        setImages(temp);
        onChange?.(temp);
    };

    return (
        <div className={styles.container}>
            {images.map((img: ImageFile) => (
                <ImagePreview key={img.name} src={img.url} onRemove={() => onRemoveImage(img)} />
            ))}
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept="image/*"
                name="image"
                multiple
                onChange={onAddImages}
                id={id}
            />
            <button type="button" className={styles.add} onClick={onClickAttach}>
                <IoCloudUpload size={30} />
            </button>
        </div>
    );
};

export default ImageUploader;
