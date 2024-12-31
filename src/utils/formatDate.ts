import { format, isToday, isYesterday } from "date-fns";

const formatDate = (date: Date, onChat?: boolean) => {
  if (isToday(date)) {
    return `Today ${format(date, "HH:mm")}`;
  } else if (isYesterday(date)) {
    return `Yesterday ${format(date, "HH:mm")}`;
  } else {
    if (onChat) {
      return format(date, "dd/MM/yy HH:mm");
    }
    return format(date, "dd/MM/yy");
  }
}

export default formatDate;
