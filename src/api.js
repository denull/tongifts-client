
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
export const loadReceived = (userId) => api(`users/${userId}/gifts`);