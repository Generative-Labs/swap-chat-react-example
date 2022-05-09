import { assetDataUtils } from "@0x/order-utils";
import { BigNumber } from "@0x/utils";
import * as ContractServices from "./contract";

const OPENSEA_API = "https://api.opensea.io/api/v1/asset/";
const MISSING_IMG_PATH = "nothing";
const Tokens = require("../assets/tokens/tokens.json");
//
//
export async function getImage(
  address: string,
  id: any,
  isERC20: boolean,
  erc20Data: any
) {
  if (!isERC20) {
    let metadata = await fetch(OPENSEA_API + address + "/" + id);
    if (metadata.ok) {
      return (await metadata.json())["image_preview_url"];
    }
  } else {
    return findERC20ImageURL(erc20Data, address);
  }
}

function findERC20ImageURL(erc20Data: any, address: string) {
  let url = MISSING_IMG_PATH;
  for (let t of erc20Data) {
    if (t["address"] === address) {
      url = t["logoURI"];
    }
  }
  return url;
}

export async function getName(address: string, id: any) {
  let metadata = await fetch(OPENSEA_API + address + "/" + id);
  if (metadata.ok) {
    return (await metadata.json())["name"];
  }
}

export async function getAssetsData(asset2List: any) {
  let asset2Data = [];
  let erc20Data = Tokens.tokens;
  for (let i = 0; i < (asset2List as any).nestedAssetData.length; i++) {
    let assetObj: any = {};
    let assetData: any = assetDataUtils.decodeAssetDataOrThrow(
      (asset2List as any).nestedAssetData[i]
    );
    assetObj["address"] = assetData["tokenAddress"];
    assetObj["type"] = "1";
    if ("tokenIds" in assetData) {
      assetObj["id"] = assetData["tokenIds"][0];
      assetObj["type"] = "3";
    }
    if ("tokenId" in assetData) {
      assetObj["id"] = assetData["tokenId"];
      assetObj["type"] = "2";
    }
    let scaling = new BigNumber(1);
    if (assetObj["type"] == "1") {
      scaling = await ContractServices.GetERC20Contract(assetObj["address"])
        .methods.decimals()
        .call();
      scaling = new BigNumber(10).pow(scaling);
    }
    assetObj["amount"] = new BigNumber((asset2List as any).amounts[i]).div(
      scaling
    );
    assetObj["imgURL"] = await getImage(
      assetObj["address"],
      assetObj["id"],
      assetObj["type"] === "1",
      erc20Data
    );
    try {
      assetObj["name"] = await ContractServices.GetERC20Contract(
        assetObj["address"]
      )
        .methods.name()
        .call();
    } catch (e) {
      assetObj["name"] = await getName(assetObj["address"], assetObj["id"]);
    }
    try {
      assetObj["symbol"] = await ContractServices.GetERC20Contract(
        assetObj["address"]
      )
        .methods.symbol()
        .call();
    } catch (e) {
      assetObj["symbol"] = "";
    }
    asset2Data.push(assetObj);
  }
  return asset2Data;
}

export function convertTimestamp(timestamp: any) {
  var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
    ampm = "AM",
    time;

  if (hh > 12) {
    h = hh - 12;
    ampm = "PM";
  } else if (hh === 12) {
    h = 12;
    ampm = "PM";
  } else if (hh == 0) {
    h = 12;
  }

  // ie: 2014-03-24, 3:00 PM
  time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm;
  return time;
}
