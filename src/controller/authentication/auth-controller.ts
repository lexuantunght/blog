import ModuleContainer from '@common/shared/module-container';
import AuthUseCase from '@domain/use-case/authenticate';

@ModuleContainer.injectable()
class AuthController {
    constructor(private authUC: AuthUseCase) {}
    public login(username: string, password: string) {
        return this.authUC.login(username, password);
    }

    public authorize() {
        return this.authUC.authorize();
    }

    public logout() {
        return this.authUC.logout();
    }

    public getEventType() {
        return this.authUC.getEventType();
    }
}

export default AuthController;
