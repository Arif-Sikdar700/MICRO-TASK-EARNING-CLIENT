import axios from "axios";
const AxiosPublic = axios.create({
  baseURL: "https://micro-task.vercel.app",
});
export default function useAxiosPublic() {
  return AxiosPublic;
}
