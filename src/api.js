
async function api(method, params = {}) {
  return (await fetch(`api/${method}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.assign(params, {
      initData: Telegram.WebApp.initData,
    }))
  })).json();
}

export const init = () => api('init');
export const loadUser = (userId) => api(`users/${userId}`);
export const loadReceived = (userId, offs = 0) => api(`users/${userId}/gifts?offs=${offs}`);
export const loadGiftActions = (giftId, offs = 0) => api(`gifts/${giftId}/history?offs=${offs}`);
export const loadRecentActions = (offs = 0) => api(`actions?offs=${offs}`);
export const buyGift = (giftId) => api(`gifts/${giftId}/buy`);