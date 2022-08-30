import ModuleContainer from '@common/shared/module-container';
import BaseController from '@controller/base-controller';
import UserData from '@domain/model/user-data';
import AuthUseCase from '@domain/use-case/authenticate';
import { setUserData } from '@utils/redux/reducer/app-reducer';

@ModuleContainer.injectable()
class AuthController extends BaseController {
    constructor(private authUC: AuthUseCase) {
        super();
    }
    public login(username: string, password: string) {
        return this.authUC.login(username, password);
    }

    public authorize() {
        return this.authUC.authorize();
    }

    public logout() {
        return this.authUC.logout();
    }

    public setUserData(userData: UserData) {
        return this.dispatch(setUserData(userData));
    }

    public getEventType() {
        return this.authUC.getEventType();
    }
}

export default AuthController;
