import DI from 'tsyringe';

export class _ModuleContainer {
    injectable = DI.injectable;
    singleton = DI.singleton;
    register = DI.container.register;
    resolve = DI.container.resolve;
}

const ModuleContainer = new _ModuleContainer();
export default ModuleContainer;
