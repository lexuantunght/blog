import { IoHome, IoPaperPlane, IoSettings, IoMail } from 'react-icons/io5';
import { FaUserEdit, FaUserLock, FaSignOutAlt } from 'react-icons/fa';

const SideBarConfig = {
    menuItems: [
        {
            label: 'Dashboard',
            path: '/',
            icon: <IoHome size={20} />,
        },
        {
            label: 'Post',
            path: '/post',
            icon: <IoPaperPlane size={20} />,
        },
        {
            label: 'Subscribe',
            path: '/subscribe',
            icon: <IoMail size={20} />,
        },
        {
            label: 'Configuration',
            path: '/config',
            icon: <IoSettings size={20} />,
        },
    ],
    coreItems: [
        {
            label: 'Update profile',
            path: '/update-profile',
            icon: <FaUserEdit size={20} />,
        },
        {
            label: 'Change password',
            path: 'change-password',
            icon: <FaUserLock size={20} />,
        },
        {
            label: 'Log out',
            icon: <FaSignOutAlt size={20} />,
        },
    ],
};

export default SideBarConfig;
