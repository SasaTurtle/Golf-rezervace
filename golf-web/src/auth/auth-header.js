export default function authHeader() {
  //const user = JSON.parse(localStorage.getItem("user"));
  const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhc2NoYS5rb21pbmVrQGdtYWlsLmNvbSIsInVzZXJpZCI6IjEiLCJleHAiOjE3MTY5ODEwOTR9.JaxEeZsXBa73QsITxogrmbLKuIvMsbq9ke445_5zJTfZMKcIfy0BTYv5na2z4Ba-zIyqvwPYINHij7WKhBp2gg";

  if (token) {
    return { Authorization: "Bearer " + token }; // for Spring Boot back-end
    //return { "x-access-token": user.accessToken }; // for Node.js Express back-end
  } else {
    return {};
  }
}
