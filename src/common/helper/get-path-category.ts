import { Category } from '@common/model';

const getPathCategory = (category: Category): string | null => {
    switch (category) {
        case 'Web development':
            return '/web-dev';
        case 'ZA Journey':
            return '/za-journey';
        default:
            return null;
    }
};

export default getPathCategory;
