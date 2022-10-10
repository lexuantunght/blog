const HeaderConfig = {
    menuItems: [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Post',
            path: '/post',
            items: [
                {
                    label: 'Web development',
                    path: '/web-development',
                },
                {
                    label: 'For life',
                    path: '/for-life',
                },
                {
                    label: 'For work',
                    path: '/for-work',
                },
                {
                    label: 'Just for fun',
                    path: '/just-for-fun',
                },
            ],
        },
        {
            label: 'About me',
            path: '/about-me',
        },
    ],
};

export default HeaderConfig;
