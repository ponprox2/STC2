import { createStore } from "zmp-core/lite";
import api from "zmp-sdk";
const store = createStore({
  state: {
    user: {
      displayName: "Zalo",
      email: "zte@zalo.me",
      avatar: "ZA",
      online: true,
      story: true,
    },
    profileUser: null,
    phoneNumber: { number: "" },
    token: null,
    localtionUser: null,
    phoneNumberCus: [
      { phoneNumber: "0125" },
      // {phoneNumber:01245},
    ],
    products: [
      {
        id: "1",
        title: "Apple iPhone 8",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
      },
      {
        id: "2",
        title: "Apple iPhone 8 Plus",
        description:
          "Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!",
      },
      {
        id: "3",
        title: "Apple iPhone X",
        description:
          "Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.",
      },
    ],
  },
  getters: {
    user({ state }) {
      return state.user;
    },
    phoneNumber({ state }) {
      return state.phoneNumber;
    },
    token({ state }) {
      return state.token;
    },
    products({ state }) {
      return state.products;
    },
    phoneNumberCus({ state }) {
      return state.phoneNumberCus;
    },
    profileUser({ state }) {
      return state.profileUser;
    },
    localtionUser({ state }) {
      return state.localtionUser;
    },
  },

  actions: {
    setUser({ state }, data) {
      state.user = { ...state.user, ...data };
    },
    setprofileUser({ state }, data) {
      state.profileUser = data;
    },
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
    setPhoneNumber({ state }, phone) {
      state.phoneNumber = phone;
    },
    setToken({ state }, tokenUser) {
      state.token = tokenUser;
    },
    setlocaltionUser({ state }, data) {
      state.localtionUser = data;
    },
    setPhoneNumberCustomer({ state }, data) {
      state.phoneNumberCus = [...state.phoneNumberCus, data];
    },
    async login({}) {
      api.login({
        success: async () => {
          api.getAccessToken({
            success: async (accessToken) => {
              const tokenUser = {
                token1: accessToken,
              };
              store.dispatch("setToken", tokenUser);
            },
            fail: (error) => {
              console.log(error);
            },
          });
          api.getStorage({
            keys: ["key1"],
            success: (data) => {
              const { key1 } = data;
              for (let i = 0; i < key1.length; i++) {
                if (key1[i].link === newUrl) {
                  setTimeout(() => {
                    api.openWebview(
                      {
                        url: newUrl,
                        success: (res) => {},
                        fail: (error) => {
                          console.log(error);
                        },
                      },
                      500
                    );
                  });
                  setBoolean(true);
                  return;
                }
                setBoolean(false);
              }
              if (boolean === true) {
                return null;
              }
              var phone = [...key1, temp];
              setUserData([...phone]);

              api.setStorage({
                data: {
                  key1: phone,
                },
                success: (data) => {
                  const { errorKeys } = data;
                  setTimeout(() => {
                    api.openWebview(
                      {
                        url: newUrl,
                        success: (res) => {},
                        fail: (error) => {
                          console.log(error);
                        },
                      },
                      500
                    );
                  });
                },
                fail: (error) => {
                  console.log(error);
                },
              });
            },
            fail: (error) => {
              console.log(error);
            },
          });
          api.getStorage({
            keys: ["Phone"],
            success: (data) => {
              const { Phone } = data;
              console.log(Phone);
              if (Phone) {
                store.dispatch("setPhoneNumber", Phone);
              } else {
                api.getPhoneNumber({
                  success: (data) => {
                    const { number } = data;
                    const phoneNumber = {
                      number: number,
                    };
                    api.setStorage({
                      data: {
                        Phone: phoneNumber,
                      },
                      success: (data) => {
                        store.dispatch("setPhoneNumber", phoneNumber);
                        const { errorKeys } = data;
                      },
                      fail: (error) => {
                        console.log(error);
                      },
                    });
                  },
                  fail: (error) => {
                    console.log(error);
                  },
                });
              }
            },
            fail: (error) => {},
          });

          api.getUserInfo({
            success: (data) => {
              const { userInfo } = data;
              store.dispatch("setprofileUser", userInfo);
            },
            fail: (error) => {
              console.log(error);
            },
          });
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
  },
});

export default store;
