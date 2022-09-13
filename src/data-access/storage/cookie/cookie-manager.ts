import Cookies from 'js-cookie';
import ModuleContainer from 'common/shared/module-container';

@ModuleContainer.singleton()
class CookieManager {
    public get(name: string) {
        return Cookies.get(name);
    }

    public remove(name: string) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export default CookieManager;
