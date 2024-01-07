import axios from "axios";

export const parseDateTime = ({
  timeString,
  configOptions = null,
  setterFunction = null,
}) => {
  const defaultOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    ...configOptions,
  };

  return new Date(
    setterFunction ? setterFunction(timeString) : timeString
  ).toLocaleDateString("en-CA", defaultOptions);
};

export const web = {
  reload: (delay = false) => {
    if (delay === false) {
      window.location.reload();
    } else {
      setTimeout(() => {
        window.location.reload();
      }, delay);
    }
  },
  url: (url) => {
    window.location.href = url;
  },
  replace: (url) => {
    window.location.replace(url);
  },
};

export const auth = {
  set: ({ name = "auth", value }) => localStorage.setItem(name, value),
  get: (name = "auth") => localStorage.getItem(name),
  destroy: (name = "auth") => {
    localStorage.removeItem(name);
    web.reload();
  },
};

export const localData = {
  set: ({ name, value }) => {
    const parsedJSON = JSON.stringify(value);
    localStorage.setItem(name, parsedJSON);
  },
  get: (name) => {
    const fetchedData = localStorage.getItem(name);
    return JSON.parse(fetchedData);
  },
};

const baseURL = "http://127.0.0.1:8800/api";

export const useAxios = axios.create({ baseURL });

const token = auth.get();

export const useAxiosWAuth = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});
