import axios from "axios";


class API {


  private authorization;
  private instance;

  constructor(authorization?: any) {
    this.authorization = authorization;
    this.instance = axios.create({
      baseURL: "/",
    });

    this.initiateConfig();
  }

  request() {
    return this.instance;
  }

  getConfig(extraConfig: any = {}) {
    let config = { ...extraConfig };

    if (this.authorization) {
      config.headers = {
        'Authorization': this.authorization
      }
    }

    return config;
  }

  initiateConfig() {
    // request interceptor
    this.instance.interceptors.request.use(
      (config: any) => {
        // Run necessary config
        return config;
      },
      (error) => {
        console.log({ error })

        return false;
      }
    );
  }

  async get(url: string, requireAuth: boolean) {
    try {
      let response = requireAuth
        ? await this.instance.get(url, this.getConfig())
        : await this.instance.get(url);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  };

  async post(url: string, payload: any, requireAuth: boolean) {
    try {
      let response = requireAuth
        ? await this.instance.post(url, payload, this.getConfig())
        : await this.instance.post(url, payload);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  };

  async patch(url: string, payload: any, requireAuth: boolean) {
    try {
      let response = requireAuth
        ? await this.instance.patch(url, payload, this.getConfig())
        : await this.instance.patch(url, payload);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  };

  async put(url: string, payload: any, requireAuth: boolean) {
    try {
      let response = requireAuth
        ? await this.instance.put(url, payload, this.getConfig())
        : await this.instance.put(url, payload);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  };

  async delete(url: string, requireAuth: boolean) {
    try {
      let response = requireAuth
        ? await this.instance.delete(url, this.getConfig())
        : await this.instance.delete(url);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  };

  handleResponse(response: any) {
    return response.data;

    return {
      status: response.status,
      data: response.data,
    }
  }

  handleError(error: any) {
    return {
      error: error.response?.data ?? 'An error occurred',
      message: error.response?.data?.message ?? 'An error occurred',
      errors: error.response?.data?.errors,
      status: false,
    };
  }
}






// const del = async (url, payload = {}, requireAuth = true) => {
//   try {
//     const meta = document.querySelector('meta[name="csrf-token"]');

//     let config = {
//       headers: {
//         'Authorization': `Bearer ${meta.getAttribute('content')}`
//       },
//       data: payload,
//     };
//     let response = requireAuth
//       ? await instance.delete(url, config)
//       : await instance.delete(url, { data: payload });
//     return response;
//   } catch (error) {
//     return handleError(error);
//   }
// };

// const apiInstance = new API;

// const { request, get, post, put, patch } = apiInstance;

// export default { request, get, post, put, patch };

export default API;