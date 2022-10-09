import ModuleContainer from 'common/shared/module-container';
import BaseController from 'controller/base-controller';
import UserUseCase from 'domain/use-case/user';

@ModuleContainer.injectable()
class UserController extends BaseController {
    constructor(private userUC: UserUseCase) {
        super();
    }

    public subscribeBlog(email: string) {
        return this.userUC.subscribe(email);
    }
}

export default UserController;
