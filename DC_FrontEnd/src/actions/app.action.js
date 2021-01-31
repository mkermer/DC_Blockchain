
export const STORE_USER_DATA = "STORE_USER_DATA";
export const STORE_LATESTBLOCK_DATA = "STORE_LATESTBLOCK_DATA";

export function storeUserData(userData) {
    return { type: STORE_USER_DATA, user: userData, loggedIn: false }
}

export function storeLatestBlockData(latestBlock) {
    return { type: STORE_LATESTBLOCK_DATA, block: latestBlock }
}