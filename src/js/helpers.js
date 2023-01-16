import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          //cos we're sending data, we need to specify a POST.
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw `${error} 💥💥💥`; //we want to handle the error in the model file, so when we
    // catch an error here, throw the error, so it rejects and sends error to the model file.
  }
};

/*
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw `${error} 💥💥💥`; //we want to handle the error in the model file, so when we
    // catch an error here, throw the error, so it rejects and sends error to the model file.
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const theFetch = fetch(url, {
      //cos we're sending data, we need to specify a POST.
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    }); //...............

    const res = await Promise.race([theFetch, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw `${error} 💥💥💥`; //we want to handle the error in the model file, so when we
    // catch an error here, throw the error, so it rejects and sends error to the model file.
  }
};
*/
