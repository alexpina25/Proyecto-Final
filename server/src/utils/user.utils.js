module.exports = {
  customUserData: (user) => {
    return {
      userId: user._id,
      email: user.email,
      name: user.name,
      image: user.image,
      telefono: user.telefono,
      reservas: user.reservas,
      check: user.check,
    };
  },
};
