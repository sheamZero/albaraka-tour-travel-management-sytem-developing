import { parseISO, differenceInCalendarDays } from "date-fns";

 const getDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return "";

        const start = parseISO(startDate);
        const end = parseISO(endDate);

        const days = differenceInCalendarDays(end, start) + 1;

        return `${days}/${days - 1}days`;
    };

    export default getDuration;