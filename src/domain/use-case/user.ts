import ModuleContainer from 'common/shared/module-container';
import type UserRepository from 'domain/repository/user-repository';
import { UserRepositoryName } from 'domain/repository/impl/user-repository-impl';
import Emitter from 'utils/event-manager/emitter';
import AppEventType from 'common/event-type/app-event-type';

@ModuleContainer.injectable()
class UserUseCase {
    private UserEventType = {
        SUBSCRIBE_FAILED: 'SUBSCRIBE_FAILED',
    };
    constructor(
        @ModuleContainer.inject(UserRepositoryName) private repository: UserRepository,
        private emitter: Emitter
    ) {}

    public async subscribe(email: string) {
        return this.repository.subscribe(email).catch((errMsg) => {
            this.emitter.emit(AppEventType.SHOW_TOAST, errMsg);
        });
    }

    public async getAboutMe() {
        return this.repository.getAbout();
    }

    public async createAboutMe(introduction: string, cv: string) {
        return this.repository.createAbout({ introduction, cv });
    }

    public getEventType() {
        return this.UserEventType;
    }
}

export default UserUseCase;
