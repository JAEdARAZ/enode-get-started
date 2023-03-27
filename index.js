import axios from "axios";
import { CREDS_B64, USER_ID } from "./config.js";
const ENODE_BASE_URL = "https://enode-api.sandbox.enode.io";
const INFO_TYPES = {
  chargeState: "charge-state",
  location: "location",
  odometer: "odometer",
  information: "information"
}

async function init() {
  const token = await getAccessToken();
  // const linkURL = await createLink(token);
  // await getUser(token);
  const vehicles = await getVehicles(token);
  const vehicleId = vehicles[0].id;
  const vehicle = await getVehicle(vehicleId, token);
  const vehicleInfo = await getVehicleInfo(vehicleId, INFO_TYPES.chargeState, token);
  console.log(vehicleInfo);
}

async function getVehicleInfo(vehicleId, infoType, token) {
  try {
    const { data } = await axios.get(
      `${ENODE_BASE_URL}/vehicles/${vehicleId}/${infoType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Enode-User-Id": USER_ID
        }
      }
    )
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getVehicle(vehicleId, token) {
  try {
    const { data } = await axios.get(
      `${ENODE_BASE_URL}/vehicles/${vehicleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Enode-User-Id": USER_ID
        }
      }
    )
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getVehicles(token) {
  try {
    const { data } = await axios.get(
      `${ENODE_BASE_URL}/vehicles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Enode-User-Id": USER_ID
        }
      }
    )
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(token) {
  try {
    const { data } = await axios.get(
      `${ENODE_BASE_URL}/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Enode-User-Id": USER_ID
        }
      }
    )
    console.log(data);
  } catch (error) {
    console.log(error);
  }

}

async function createLink(token) {
  try {
    const { data } = await axios.post(
      `${ENODE_BASE_URL}/users/${USER_ID}/link`,
      {
        vendorType: "vehicle"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return data.linkUrl;
  } catch (error) {
    console.log(error);
  }
}

async function getAccessToken() {
  const options = {
    url: "https://oauth.sandbox.enode.io/oauth2/token",
    method: "POST",
    data: {
      "grant_type": "client_credentials"
    },
    headers: {
      Authorization: `Basic ${CREDS_B64}`,
      "content-Type": "application/x-www-form-urlencoded"
    }
  }

  try {
    const { data } = await axios(options);
    return data.access_token;
  } catch (error) {
    console.log(error);
  }
}

init();