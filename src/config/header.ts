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
                    label: 'Life stories',
                    path: '/life-stories',
                },
                {
                    label: 'Work',
                    path: 'work',
                },
                {
                    label: 'Study & UIT',
                    path: '/study-uit',
                },
                {
                    label: 'Other',
                    path: '/other',
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
