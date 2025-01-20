import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:4000'
})


export default function useAxiosPublic() {
  return axiosPublic;
}
