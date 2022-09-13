import AppConfig from 'config/app';

export type Mode = typeof AppConfig.modes[number];

export type ImageFile = {
    file?: any;
    url?: any;
    name?: string;
};
