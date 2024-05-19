import { API_URL } from "../config";

//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);

//actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const DATA_ADS = createActionName("DATA_ADS");
const ADD_AD = createActionName("ADD_ADS");
const DELETE_AD = createActionName("DELETE_ADS");

//action creators
export const updateAds = (payload) => ({ type: DATA_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const removeAd = (payload) => ({ type: DELETE_AD, payload });

// THUNKS
export const loadAdsRequest = () => async (dispatch) => {
    try {
      const res = await fetch(`${API_URL}/api/ads`)
      const data = await res.json();
      dispatch(updateAds(data));
    } catch (error) {
      console.error(error)
    }
  };

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case DATA_ADS:
      return [...action.payload];
    case ADD_AD:
      return [...statePart, { ...action.payload }];
    case DELETE_AD:
      return [...statePart.filter((ad) => ad._id !== action.payload)];
    default:
      return statePart;
  }
};

export default adsReducer;