import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Button from 'common/ui/Button';
import combineClasses from 'common/ui/combine-classes';
import styles from './carousel.module.scss';
import PagingIndicator from 'common/ui/PagingIndicator';

type CarouselProps = {
    photos: Array<string>;
    className?: string;
    maxCount?: number;
};

const Carousel = (props: CarouselProps) => {
    const [currentPhoto, setCurrentPhoto] = React.useState(0);
    const { photos, className, maxCount = 8 } = props;

    const onChangePhoto = (index: number) => {
        if (index >= 0 && index <= photos.length - 1) {
            setCurrentPhoto(index);
        }
    };

    if (photos.length === 0 || photos.length > maxCount) {
        return null;
    }

    return (
        <div className={combineClasses([true, styles.container], [true, className])}>
            {photos.map((photo, index) => (
                <img
                    key={index}
                    src={photo}
                    className={styles.photo}
                    style={{ transform: `translateX(${(index - currentPhoto) * 100}%)` }}
                    alt="carousel-photo"
                />
            ))}
            <PagingIndicator
                className={styles.paging}
                pageCount={photos.length}
                page={currentPhoto}
            />
            <Button
                mode="text"
                className={styles.prev}
                disabled={currentPhoto === 0}
                onClick={() => onChangePhoto(currentPhoto - 1)}>
                <IoChevronBackOutline size={36} />
            </Button>
            <Button
                mode="text"
                className={styles.next}
                disabled={currentPhoto === photos.length - 1}
                onClick={() => onChangePhoto(currentPhoto + 1)}>
                <IoChevronForwardOutline size={36} />
            </Button>
        </div>
    );
};

export default Carousel;
