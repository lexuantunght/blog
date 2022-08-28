import { IoHome, IoPaperPlane, IoSettings, IoMail } from 'react-icons/io5';

const SideBarConfig = {
    menuItems: [
        {
            label: 'Dashboard',
            path: '/admin',
            icon: <IoHome size={20} />,
        },
        {
            label: 'Post',
            path: '/admin/post',
            icon: <IoPaperPlane size={20} />,
        },
        {
            label: 'Subscribe',
            path: '/admin/subscribe',
            icon: <IoMail size={20} />,
        },
        {
            label: 'Configuration',
            path: '/admin/config',
            icon: <IoSettings size={20} />,
        },
    ],
};

export default SideBarConfig;
