import { CronJob } from "cron";
import { bigNumber, formatBalance } from "../common/helper/bigNumber";
import axios from "axios";
import { handlePushTelegramNotification } from "../controllers/homepageController";
import { generateTelegramHTML } from "../common/helper/common.helper";

const job = new CronJob("*/10 * * * * *", () => {
  // Tác vụ log message
  console.log("Đây là một log message.");
});

const checkReleasePoolToken = new CronJob("*/10 * * * * *", async () => {
  console.log("running cron job checkReleasePoolToken...");
  const raw = await axios.get(`https://api.ref.finance/list-pools`, {});

  const filterToken = raw?.data?.filter(
    (i: any) =>
      (bigNumber(i?.tvl).gt(100) || bigNumber(i?.tvl).eq(0)) &&
      (i?.token_account_ids as Array<string>).includes("usmeme.tg") &&
      ((i?.token_account_ids as Array<string>).includes("wrap.near") ||
        (i?.token_account_ids as Array<string>).includes(
          "usdt.tether-token.near"
        ))
  );

  const rsFocus: Array<any> = filterToken
    .sort((a: any, b: any) => (bigNumber(a.tvl).gte(b.tvl) ? -1 : 1))
    .map((i: any) => {
      return {
        // ...i,
        id: i?.id,
        token_account_ids: i?.token_account_ids,
        token_symbols: i?.token_symbols,
        token_price: i?.token0_ref_price,
        liq: formatBalance(i?.tvl),
      };
    });

  if (rsFocus.length) {
    handlePushTelegramNotification({
      body: rsFocus.map((i: any) => generateTelegramHTML(i)).join("\n\n"),
    });
  }

  return;
});

export { job, checkReleasePoolToken };
