import axios from "axios";

export const api = axios.create({
  baseURL: "/",
});

const instance = axios.create({
  baseURL: "/",
});

// request interceptor
instance.interceptors.request.use(
  (config, reqAuth) => {
    // console.log({config})
    return config;
  },
  (error) => {
    //check 401 unauthorized error and redirect to login if such occurs
    // console.log({error})
  }
);

const meta = document.querySelector('meta[name="csrf-token"]');

let config = {
  headers: {
    'Authorization': `Bearer ${meta.getAttribute('content')}`
  },
};

const get = async (url, requireAuth = false) => {
  try {
    let response = requireAuth
      ? await instance.get(url, config)
      : await instance.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

const post = async (url, payload, requireAuth = false) => {
  try {


    // console.log({ config })
    let response = requireAuth
      ? await instance.post(url, payload, config)
      : await instance.post(url, payload);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const patch = async (url, payload, requireAuth = false) => {
  try {
    let response = requireAuth
      ? await instance.patch(url, payload, config)
      : await instance.patch(url, payload);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const put = async (url, payload = {}, requireAuth = false) => {
  try {
    let response = requireAuth
      ? await instance.put(url, payload, config)
      : await instance.put(url, payload);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const del = async (url, payload = {}, requireAuth = true) => {
  try {
    const meta = document.querySelector('meta[name="csrf-token"]');

    let config = {
      headers: {
        'Authorization': `Bearer ${meta.getAttribute('content')}`
      },
      data: payload,
    };
    let response = requireAuth
      ? await instance.delete(url, config)
      : await instance.delete(url, { data: payload });
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {

  // return error
  return {
    error: error.response?.data ?? 'An error occurred',
    message: error.response?.data?.message ?? 'An error occurred',
    errors: error.response?.data?.errors,
    status: false,
  };
}

export { get, post, put, patch, del };