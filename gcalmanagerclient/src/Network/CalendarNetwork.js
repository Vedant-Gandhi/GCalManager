import { DOMAIN_NAME } from "../Config";
import { getData } from "./Network";

export default function getCalendarEvents(sucess, failure) {
  getData(
    `${DOMAIN_NAME}getEvents`,
    (result) => {
      sucess(result.data.data);
    },
    failure
  );
}
