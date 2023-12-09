module.exports = {
  customUserData: (user) => {
    return {
      _id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      telefono: user.telefono,
      reservas: user.reservas,
      check: user.check,
    };
  },
};
