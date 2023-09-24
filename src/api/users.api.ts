import axios from "axios";

function store(firstName: string, lastName: string, email: string) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    first_name: firstName,
    last_name: lastName,
    email_address: email,
  });
}

function update(userId: number, businessType: string) {
  return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    business_type: businessType,
  });
}

const UsersAPI = {
  store,
  update,
};

export default UsersAPI;
