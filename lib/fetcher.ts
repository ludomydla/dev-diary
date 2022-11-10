//export const BASE_URL = location.origin;
//export const BASE_URL = location.origin.includes('localhost') ? 'https://xp-timeline.herokuapp.com' : location.origin

export const call = {
  gas: {
    GET: async function () {
      const jsonResponse = await fetch(`/api/gas`);
      const jsonData = await jsonResponse.json();
      return jsonData;
    },
    POST: async function (tacho: number, litres: number, price: number) {
      const response = await fetch(`/api/gas`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tacho, litres, price }),
      });
      return response;
    },
  },
};
