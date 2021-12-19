import { atom } from 'recoil';

export const playlistAtom = atom({
    key: "playlistState",
    default: null,
});

export const playlistIdState = atom({
    key: "playlistIdState",
    default: "7bUf5iyy3kPytD2fBRhNUZ",
})