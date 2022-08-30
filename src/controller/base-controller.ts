import { createDraftSafeSelector } from '@reduxjs/toolkit';
import store, { RootState } from '@utils/redux/store';

class BaseController {
    public dispatch = store.dispatch;
    public createSelector = <T>(selector: (state: RootState) => T) => {
        return createDraftSafeSelector(selector, (state) => state);
    };
}

export default BaseController;
