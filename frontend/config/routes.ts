export const routes = {
  home: "/",
  auth: {
    login: "/auth/login",
  },
  user: {
    create: "/admin/createUser",
    get: `/user/`,
    update: `/id`,
    delete: `/id`,
  },
  admin: {
    set: (id: string) => `/admin/set/${id}`,
    users: "/admin/all",
    remove: (id: string) => `/admin/remove/${id}`,
    get: (id: string) => `/admin/${id}`,
    updateInfo: (id: string) => `/admin/${id}`,
    delete: `/admin/delete`,
  },
  model: {
    deleteCostumer: (id: string) => `/model/customer/${id}`,
    createCostumer: "/model/create_customer",
    getCostumer: (id: string) => `/model/customer/${id}`,
    updateCostumer: (id: string) => `/model/customer/${id}`,
    predict: (id: string) => `/model/predict/${id}`,
  },
  pokemon: {
    create: "/pokemon/create",
    get: `/pokemon/`,
    updateNickName: (id: string) => `/pokemon/${id}`,
    delete: (id: string) => `/pokemon/${id}`,
  },
};
