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
                    path: '/post/web-development',
                },
                {
                    label: 'For life',
                    path: '/post/for-life',
                },
                {
                    label: 'For work',
                    path: '/post/for-work',
                },
                {
                    label: 'Just for fun',
                    path: '/post/just-for-fun',
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
