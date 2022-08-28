import ModuleContainer from '@common/shared/module-container';
import type AuthRepository from '@domain/repository/auth-repository';
import { AuthRepositoryName } from '@domain/repository/impl/auth-repository-impl';
import Emitter from '@utils/event-manager/emitter';

@ModuleContainer.injectable()
class AuthUseCase {
    private AuthEventType = {
        LOGIN_FAILED: 'LOGIN_FAILED',
        AUTHORIZED_FAILED: 'AUTHORIZED_FAILED',
    };
    constructor(
        @ModuleContainer.inject(AuthRepositoryName) private repository: AuthRepository,
        private emitter: Emitter
    ) {}

    public async login(username: string, password: string) {
        return this.repository.login(username, password).catch((errMsg) => {
            this.emitter.emit(this.AuthEventType.LOGIN_FAILED, errMsg);
        });
    }

    public async authorize() {
        return this.repository.authorize().catch((errMsg) => {
            this.emitter.emit(this.AuthEventType.AUTHORIZED_FAILED, errMsg);
        });
    }

    public async logout() {
        return this.repository.logout();
    }

    public getEventType() {
        return this.AuthEventType;
    }
}

export default AuthUseCase;
