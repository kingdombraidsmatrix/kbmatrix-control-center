import { create } from 'zustand';

type ActionType = 'new' | 'edit' | 'duplicate';

interface State {
  isPushModalOpen: boolean;
  openPushModal: (messageId?: number, action?: ActionType) => void;
  closePushModal: () => void;
  selectedMessageId?: number;
  action?: ActionType;
}

const initialState = {
  isPushModalOpen: false,
};
export const useCrmStore = create<State>((set) => ({
  ...initialState,
  openPushModal: (messageId, action = 'new') =>
    set({ isPushModalOpen: true, selectedMessageId: messageId, action }),
  closePushModal: () =>
    set({ isPushModalOpen: false, selectedMessageId: undefined, action: undefined }),
}));
