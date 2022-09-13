import { ImageFile, Mode } from 'common/model';

export default interface PostCreation {
    title: string;
    photos: Array<ImageFile>;
    content: string;
    mode: Mode;
    category: string;
}
