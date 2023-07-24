export const updateToken = () => {
  try {
    const user = localStorage.getItem("user");
    if (user) {
      const parseUser = JSON.parse(user);
      return parseUser.token;
    }
  } catch (error) {
    console.error("Error updating token:", error);
  }
};